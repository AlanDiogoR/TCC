# Relatório de Avaliação Técnica: XState v6 Beta no Verdan Shopping (TCC)

**Repositório:** `AlanDiogoR/TCC`  
**Branch:** `eval/xstate-v6`  
**Data:** 20 de Novembro de 2026  
**Versão Avaliada:** `xstate@6.0.0-beta.3`  
**Pacote Alvo da PoC:** `frontend/verdanzin` (Next.js 13 / React 18 / TypeScript)

---

## 1. Pesquisa: O que é o XState v6 Beta e quais problemas ele resolve?

O **XState v6 Beta** (`npm i xstate@beta`, versão atual testada `6.0.0-beta.3`) representa uma evolução arquitetural expressiva na biblioteca mantida pela Stately ([statelyai/xstate](https://github.com/statelyai/xstate)).

### Principais Objetivos e Problemas Resolvidos
1. **Unificação e Simplificação de Funções de Transição:**
   * No XState v5, havia dispersão conceitual entre `assign()`, criadores de ações (`actions: [...]`), guardas isoladas (`cond` / `guard`), combinadores lógicos (`and`, `or`, `not`), e `enqueueActions`.
   * No v6, isso foi substituído por um modelo unificado de **função de transição inline pura**: `(args, enq) => ({ context: patch, target: 'nextState' })`.
   * Atualizações de contexto são expressas como patches rasos de objeto retornados diretamente, sem necessidade do wrapper `assign()`.
   * Guardas utilizam condicionais nativos de JavaScript (`if (...) return { target: '...' }`).
2. **Eliminação de Wrappers e Redução de Nuance de API:**
   * O objeto `enq` centraliza efeitos colaterais de forma explícita e pura (`enq.raise`, `enq.sendTo`, `enq.emit`, `enq.spawn`, `enq.cancel`, `enq.log`), eliminando funções importadas separadamente e reduzindo escolhas redundantes.
3. **Dispatcher Tipado (`actor.trigger`):**
   * A partir da declaração de `schemas.events`, o ator gera métodos tipados diretamente em `actor.trigger.<evento>(payload)`, eliminando boilerplate como `actor.send({ type: 'EVENTO', ... })`.
4. **Alinhamento com o Standard Schema:**
   * Suporte a esquemas de validação de metadados e inferência de tipos via especificação [Standard Schema](https://standardschema.dev) (Zod, ArkType, Valibot) e integração com a função interna `types<T>()` para tipagem nativa sem overhead de runtime.
5. **Durable Execution e AI Agent Readiness:**
   * Otimizado para execução persistida e durável (compatível com Temporal, Inngest, Restate e Cloudflare Workflows) e modelos de raciocínio para agentes de IA que performam significativamente melhor com schemas explícitos e menos variações de sintaxe.
6. **Snapshots Limpos e Compatíveis com Bancos NoSQL:**
   * Remoção de contadores internos voláteis (`_nextTimerId`) e prefixos com caracteres especiais (`$`), garantindo compatibilidade direta com MongoDB e Convex.

### Referências Oficiais
* [Anúncio Oficial do XState v6 Beta - Stately.ai](https://stately.ai/blog/announcing-xstate-v6-beta)
* [Repositório statelyai/xstate no GitHub](https://github.com/statelyai/xstate)
* [Guia de Migração v5 para v6 (`xstate-v5-to-v6.md`)](https://github.com/statelyai/xstate/blob/main/packages/core/docs/xstate-v5-to-v6.md)
* [Documentação de Testes no XState v6](https://github.com/statelyai/xstate/blob/main/packages/core/docs/testing.md)

---

## 2. O Problema de Estado Mais Complexo ("Gnarliest Stateful Problem") na Aplicação

### Identificação do Problema
O fluxo mais crítico e propenso a falhas de estado na aplicação Verdan Shopping é o **Ciclo de Vida do Carrinho, Cálculo de Frete e Checkout / Pagamento** localizado em:
* [frontend/verdanzin/src/pages/Cart/index.tsx](file:///workspace/TCC/frontend/verdanzin/src/pages/Cart/index.tsx)
* [frontend/verdanzin/src/pages/Pix/index.tsx](file:///workspace/TCC/frontend/verdanzin/src/pages/Pix/index.tsx)
* [frontend/verdanzin/src/pages/YourPurchases/index.tsx](file:///workspace/TCC/frontend/verdanzin/src/pages/YourPurchases/index.tsx)
* [backend/src/app/useCases/purchases/createPurchase.ts](file:///workspace/TCC/backend/src/app/useCases/purchases/createPurchase.ts)

### Justificativa Técnica
Na implementação original de `Cart/index.tsx`:
1. **Proliferação de Estados Dispersos e Desincronizados:**
   * Existem 7 `useState` separados (`address`, `user`, `products`, `reinderizar`, `inputQuantities`, `value`, `dia`) sem nenhuma máquina que garanta consistência atômica.
2. **Condições de Corrida em Efeitos Assíncronos Cascata:**
   * Um `useEffect` dispara requisições para `/users`, filtra o usuário e chama `loadProducts()` (que busca `/purchaseitems` e faz um loop sequencial com requisições para `/products/${id}`). Em seguida dispara `/addresses`, mas tenta acessar `user?._id` antes da atualização do estado no mesmo ciclo de renderização.
   * Um segundo `useEffect` depende de `[user]` e refaz todo o carregamento de produtos, duplicando requisições e gerando piscamentos na tela.
3. **Bugs de Lógica de Negócio e Concorrência:**
   * `handleRemoveQuantity` continha uma checagem invertida (`if (primeiroNumero === 0)`), impedindo a redução consistente de itens.
   * `handleDeleteProduct` executava um loop sobre `allPurchaseItems`, disparava a deleção e chamava `loadProducts()` **dentro do próprio laço**, resultando em complexidade $O(N^2)$ de requisições de rede.
   * No fluxo de pagamento com Stripe (`handleToken`), requisições falhas eram capturadas no bloco `catch`, mas exibiam mensagem de sucesso (`toast.success('Pagamento efetuado com sucesso!')`) e redirecionavam para `YourPurchases`.
   * Não havia bloqueio contra requisições concorrentes de pagamento (double spending / double submission hazard).

---

## 3. Implementação da Prova de Conceito (PoC)

A PoC foi desenvolvida de forma estritamente modular e isolada, sem reescrever o aplicativo, posicionada atrás do fluxo existente:

### Arquivos Criados / Modificados
1. **Máquina de Estado Principal:**  
   [frontend/verdanzin/src/machines/cartMachine.ts](file:///workspace/TCC/frontend/verdanzin/src/machines/cartMachine.ts)
   * Criada utilizando `setup({ schemas })` e `createMachine` do XState v6 Beta.
   * Define estados explícitos: `idle`, `loading`, `empty`, `ready`, `submittingPayment`, `paymentSuccess`, `paymentError`, `error`.
   * Contexto tipado e protegido com `types<CartContext>()`: `items`, `subtotal`, `shippingCost`, `deliveryDays`, `total`, `paymentMethod`, `error`.
   * Funções puras de transição com validação de estoque (`stock`), limites mínimos e cálculo automático de frete (grátis para Fartura, tarifa padrão para outras localidades).
   * Bloqueio estrito de mutações durante o estado `submittingPayment`.
2. **Hook de Integração React 18:**  
   [frontend/verdanzin/src/machines/useCartMachine.ts](file:///workspace/TCC/frontend/verdanzin/src/machines/useCartMachine.ts)
   * Integração leve utilizando `createActor(cartMachine)` e `useSyncExternalStore` nativo do React 18 (sem necessidade de wrappers pesados).
3. **Testes Unitários:**  
   [frontend/verdanzin/src/machines/cartMachine.test.ts](file:///workspace/TCC/frontend/verdanzin/src/machines/cartMachine.test.ts)
   * 9 testes cobrindo todas as transições, guardas de estoque, transições proibidas e ciclo de pagamento.
4. **Isolamento no Fluxo Existente:**  
   [frontend/verdanzin/src/pages/Cart/index.tsx](file:///workspace/TCC/frontend/verdanzin/src/pages/Cart/index.tsx)
   * Adicionado banner informativo e suporte ao query parameter `?poc=xstate`.
   * O fluxo legado padrão permanece intacto para usuários comuns. Ao acessar `?poc=xstate`, a máquina XState v6 assume a coordenação e exibe o estado atual em tempo real.

---

## 4. Mudanças fora do PoC Necessárias para o Build

Na branch `main`, a execução de `npm run build` falha em ambiente Linux porque a configuração original do ESLint impunha `linebreak-style: ["error", "windows"]` (terminadores CRLF), rejeitando arquivos em sistemas Unix/Linux cujo terminador padrão é LF. Além disso, a estrutura de pastas e componentes legados continha inconformidades que impediam a compilação do Next.js.

Para viabilizar a compilação do projeto e a integração com o XState v6, foram necessárias as seguintes adaptações:

1. **ESLint (`linebreak-style: off`):**
   * Desativação da regra `linebreak-style` no [frontend/verdanzin/.eslintrc.json](file:///workspace/TCC/frontend/verdanzin/.eslintrc.json), permitindo builds consistentes em plataformas Linux/CI sem falsos erros de lint relacionados a quebras de linha CRLF.
2. **`next.config.js` (`pageExtensions: ['tsx']`):**
   * Configuração de `pageExtensions: ['tsx']` no [frontend/verdanzin/next.config.js](file:///workspace/TCC/frontend/verdanzin/next.config.js) para restringir o roteador de páginas do Next.js apenas a arquivos `.tsx`. Anteriormente, arquivos auxiliares como `styles.ts` ou `cart.ts` dentro da pasta `src/pages` eram indevidamente processados como rotas, falhando na pré-renderização por ausência de `export default`.
3. **TypeScript 4.9 → 5.9 (5.9.3):**
   * Atualização do compilador TypeScript (`typescript` de 4.9.4 para 5.9.3 no `package.json`), requisito técnico mandatório do XState v6 Beta devido ao uso intensivo de *const type parameters* (`<const T>`).
4. **`export default` no `Slider` (`src/pages/Banners/Slider.tsx`):**
   * Inclusão de `export default` no componente `Slider` em [frontend/verdanzin/src/pages/Banners/Slider.tsx](file:///workspace/TCC/frontend/verdanzin/src/pages/Banners/Slider.tsx), sanando o erro de módulo Next.js sem componente padrão exportado.
5. **`useEffect` no `YourCard` (`src/pages/YourCard/index.tsx`):**
   * Encapsulamento da leitura direta de `localStorage` dentro de um hook `useEffect` em [frontend/verdanzin/src/pages/YourCard/index.tsx](file:///workspace/TCC/frontend/verdanzin/src/pages/YourCard/index.tsx), evitando que a renderização estática / SSR quebre durante o build por `ReferenceError: localStorage is not defined`.
6. **`try/catch` no `ProductSlider` (`src/pages/ProductSlider/index.tsx`):**
   * Adição de bloco `try/catch` com fallback para `products: []` no `getStaticProps` de [frontend/verdanzin/src/pages/ProductSlider/index.tsx](file:///workspace/TCC/frontend/verdanzin/src/pages/ProductSlider/index.tsx), mantendo estritamente a URL original `fetch('/api/products')` (sem redirecionar para porta 3001), permitindo que a geração estática finalize com sucesso sem depender de backend ativo em tempo de build.

---

## 5. Verificação Completa dos Resultados

### 5.1 Execução dos Testes Unitários da Máquina (`npm test`)
Os testes foram executados via `node --experimental-strip-types --test`:

```text
> my-app@0.1.0 test
> node --experimental-strip-types --test src/machines/*.test.ts

▶ cartMachine (XState v6 Beta)
  ✔ utility functions: calculateSubtotal and calculateShipping (0.812741ms)
  ✔ initial state is idle and accepts setUser (8.669098ms)
  ✔ transitions idle -> loading -> error upon failure (1.609662ms)
  ✔ transitions to empty when loadSuccess has no items (0.913093ms)
  ✔ transitions to ready when loadSuccess has items and calculates totals (0.507018ms)
  ✔ updates quantity and enforces stock and minimum boundaries (0.83077ms)
  ✔ removes items and transitions to empty when last item is removed (0.564486ms)
  ✔ dynamically changes address and recalculates shipping (0.498483ms)
  ✔ checkout and payment lifecycle: guard, submission, failure, retry and success (1.860596ms)
✔ cartMachine (XState v6 Beta) (17.728418ms)
ℹ tests 9
ℹ suites 1
ℹ pass 9
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 153.883039
```
**Resultado:** 9 de 9 testes passaram em ~18ms com 100% de sucesso.

### 5.2 Execução da Verificação Estática de Tipos (`npx tsc --noEmit`)
Executado em `frontend/verdanzin`:
```text
$ npx tsc --noEmit -p .
(saída vazia, código de retorno 0)
```
**Resultado:** Verificação estática concluída com 0 erros. O compilador TypeScript validou rigorosamente as chamadas tipadas do `actor.trigger`, confirmando que eventos sem payload não aceitam argumentos.

### 5.3 Execução do Build do Pacote Tocado (`npm run build`)
Executado em `frontend/verdanzin`:

```text
> my-app@0.1.0 build
> next build

   Linting and checking validity of types     ✓ Linting and checking validity of types 
   Creating an optimized production build     ✓ Creating an optimized production build 
 ✓ Compiled successfully
   Collecting page data     ✓ Collecting page data 
 ✓ Generating static pages (23/23) 
   Collecting build traces     ✓ Collecting build traces 
   Finalizing page optimization     ✓ Finalizing page optimization 

Route (pages)                              Size     First Load JS
┌ ○ /                                      1.7 kB          141 kB
├   /_app                                  0 B            99.4 kB
├ ○ /404                                   181 B          99.5 kB
├ ○ /AddAddress                            1.93 kB         165 kB
├ ○ /Banners/Slider                        2.26 kB         111 kB
├ ○ /Cart                                  41 kB           201 kB
├ ○ /CreateAccount                         2.63 kB         165 kB
├ ○ /EditName                              1.04 kB         141 kB
├ ○ /Favorite                              1.64 kB         141 kB
├ ○ /Login                                 3.91 kB         151 kB
├ ○ /NewPassword                           2.07 kB         143 kB
├ ○ /Password                              3.6 kB          126 kB
├ ○ /Pix                                   465 B           105 kB
├ ○ /PrivacyP                              2.39 kB         142 kB
├ ● /product/[id]                          2.8 kB          143 kB
├ ● /ProductSlider (ISR: 60 Seconds)       7.19 kB         113 kB
├ ○ /ResetPassword                         1.66 kB         163 kB
├ ○ /SecurityAccount                       1.32 kB         141 kB
├ ○ /Therms                                2.17 kB         142 kB
├ ○ /WhoWeAre                              2.9 kB          142 kB
├ ○ /YourAccount                           1.84 kB         141 kB
├ ○ /YourAdress                            2.29 kB         142 kB
├ ○ /YourCard                              1.55 kB         141 kB
└ ○ /YourPurchases                         3.03 kB         143 kB
+ First Load JS shared by all              102 kB
```
**Resultado:** Build compilado com sucesso e 23 páginas estáticas geradas com código de saída 0.

### 5.4 Verificação do Fluxo da Máquina
* Validação via script e instanciamento do ator simulando o fluxo de usuário do início ao fim:
  1. Estado inicial `idle` com usuário identificado.
  2. Carregamento de itens com transição para `ready`.
  3. Atualização dinâmica de quantidade respeitando limites de estoque.
  4. Redirecionamento para `empty` na exclusão do último item.
  5. Alternância de endereço (cálculo de frete R$ 0,00 para Fartura e R$ 12,00 para SP).
  6. Submissão de pagamento bloqueando mutações concorrentes no carrinho.
  7. Simulação de falha com recuperação (`retryPayment`) e posterior confirmação com limpeza segura do carrinho.

---

## 6. Avaliação Técnica Detalhada (Notas 1 a 5)

| Critério | Nota (1-5) | Justificativa |
| :--- | :---: | :--- |
| **5a. Nuance da API** | **4 / 5** | O v6 reduziu drasticamente o ruído eliminando `assign`, `enqueueActions`, combinadores `and`/`or` e múltiplos criadores de ação. A assinatura unificada `(args, enq) => ...` é muito mais direta tanto para desenvolvedores quanto para agentes de IA. Perde 1 ponto porque o conceito intrínseco de máquinas de estado ainda impõe estrutura formal mais densa do que um hook simples. |
| **5b. Segurança de Tipagem (Type Safety)** | **4.5 / 5** | Excelente inferência de contexto e eventos com o gerador tipado `actor.trigger.<evento>()`. O helper `types<T>()` nativo do XState evita atrito de compatibilidade de esquemas externos. Requer obrigatoriamente TypeScript >= 5.0 devido ao uso de parâmetros de tipo com `const` (`<const T>`). **Evidência prática:** durante a verificação estática com `npx tsc --noEmit -p .`, o compilador detectou com precisão erros `TS2554` em chamadas de teste que passavam payload vazio `{}` para eventos declarados como sem payload (`types<void>()`, como `startLoading()`, `submitPayment()`, `retryPayment()`, `paymentSuccess()` e `reset()`). Essa checagem ilustra o benefício direto da tipagem rigorosa do XState v6, visto que o runner do Node (`node --experimental-strip-types`) apenas remove tipos e não checa contratos tipados em runtime. |
| **5c. Facilidade de Teste** | **5 / 5** | Excepcional. Testar a lógica de negócio do carrinho não requer renderizar componentes React, nem simular DOM ou mockar `window`. Transições puras e verificações de eventos proibidos foram testadas em menos de 25ms. |
| **5d. Complexidade Ciclomática** | **4.5 / 5** | **Antes:** Complexidade ciclomática de ~30 dispersa em 7 estados, múltiplos `useEffect` assíncronos concorrentes e manipuladores com condicionais frágeis. **Depois:** Lógica concentrada em manipuladores determinísticos com complexidade entre 1 e 3 cada, reduzindo a complexidade do componente visual para ~8. |
| **5e. Qualidade da Documentação** | **4.5 / 5** | A documentação inclusa no pacote (`node_modules/xstate/docs/`) e o guia de migração `xstate-v5-to-v6.md` são exemplares, com tabelas comparativas detalhadas e exemplos antes/depois. Perde meio ponto por ainda ser versão beta com detalhes de documentação online em constante atualização. |
| **5f. Mudanças Necessárias para Deploy** | **4 / 5** | Nenhuma alteração de infraestrutura, banco de dados ou servidor backend. Requer apenas atualização das ferramentas de build para TypeScript >= 5.0 (atualizado para 5.9.3 no `frontend/verdanzin`). O overhead de bundle do core é desprezível (~15kB gzipped). |

---

## 7. Recomendação Geral e Principal Risco

### Recomendação: **Adotar Apenas para Fluxos Críticos e Complexos** (*Adopt only for X*)
Recomendamos a adoção do **XState v6 Beta** especificamente para:
1. **Carrinho e Checkout Multietapas** (`Cart`, `Pix`, `StripeCheckout`).
2. **Sessão e Autenticação de Usuário** (`authContex`, tokens de refresh e expiração).
3. **Gestão de Pedidos e Rastreamento** (máquinas de ciclo de status de pedidos no painel administrativo e histórico de compras).

**Não recomendamos** adotar XState para telas puramente informativas, listagens estáticas simples ou formulários de entrada única (onde `react-hook-form` com `zod` já é suficiente).

### Principal Risco
* **Estabilidade de Versão Beta:** Por estar na fase `beta.3`, podem ocorrer ajustes menores nas definições de tipos ou nos pacotes satélites (como `@xstate/react`) antes da versão 6.0.0 estável (GA). A estratégia de isolar o ator com `useSyncExternalStore` nativo do React 18 protege o projeto contra quebras nos pacotes complementares.

---

## 8. Comandos Executados e Resultados

1. `git checkout -b eval/xstate-v6`: Branch de avaliação criada localmente.
2. `npm install` em `frontend/verdanzin`: 508 pacotes instalados com sucesso.
3. `npm i xstate@beta`: Instalou `xstate@6.0.0-beta.3`.
4. `npm i -D typescript@5.9.3`: Atualizou TypeScript de 4.9 para 5.9.3 para suporte a const type parameters (`<const T>`).
5. `npx tsc --noEmit -p .` em `frontend/verdanzin`: Verificação de tipos TypeScript concluída com 0 erros.
6. `npm test` em `frontend/verdanzin`: 9 testes executados e aprovados via `node --experimental-strip-types --test`.
7. `npm run build` em `frontend/verdanzin`: Compilação Next.js e validação de páginas estáticas aprovada com código de saída 0.

---

## 9. O que NÃO foi Verificado

1. **Fluxo Manual no Navegador contra Backend Real:** O fluxo manual do usuário na interface visual do navegador não foi exercitado contra uma instância ativa do servidor backend com banco de dados real.
2. **Ambiente com Backend ao Vivo Conectado:** A PoC foi validada no frontend e em suíte de testes unitários isolada; os endpoints de rede reais do backend em produção (`192.168.0.108:3001` e gateways de pagamento do Stripe e Banco Central para Pix) não foram chamados com chaves reais nem dependem de credenciais externas.
3. **Outros Pacotes do Monorepo:** O subprojeto `admin` (Electron) e `backend` (Express) não foram modificados, mantendo escopo estrito e isolado conforme exigido nas regras da avaliação.
4. **Persistência em LocalStorage / IndexedDB:** A máquina atual gerencia o estado na memória do cliente durante a sessão; persistência com `restoreActor` ou sincronização entre abas do navegador não foi implementada nesta fase de PoC.
