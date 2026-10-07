# Verdan — E-commerce (TCC)

<p align="center">
  <img src="frontend/verdanzin/src/assets/logo/verdan_logo_org.png" alt="Logo Verdan" height="100"/>
</p>

Trabalho de Conclusão de Curso (TCC) em **Desenvolvimento de Sistemas**: um e-commerce para a loja **Verdan**, com loja virtual em Next.js, API REST em Node.js/Express com MongoDB e um app desktop (Electron) para cadastrar produtos.

> Projeto acadêmico desenvolvido entre o fim de 2022 e 2023. O código reflete esse momento de aprendizado e é mantido aqui como registro do TCC.

## Stack

| Parte | Pasta | Tecnologias |
|---|---|---|
| **Loja virtual** | `frontend/verdanzin` | Next.js 13 (Pages Router), React 18, TypeScript, Stitches (CSS-in-JS), TanStack React Query, React Hook Form + Zod, Axios, Keen Slider, React Toastify, `react-stripe-checkout`, `qrcode.react` |
| **API REST** | `backend` | Node.js, Express, TypeScript, Mongoose (MongoDB), JSON Web Token, bcrypt, Multer (upload de imagens) |
| **Admin desktop** | `admin` | Electron + React (Create React App com CRACO), styled-components, Axios |
| **Protótipos** | `frontend/verdan`, `my_electron_react_application`, `testElectron`, `test` | Primeira versão da loja (CRA + Sass) e testes de Electron e de voz |

## Funcionalidades

Verificadas nas rotas de `backend/src/router.ts` e nas páginas de `frontend/verdanzin/src/pages`:

**API (porta 3001)**
- CRUD de **categorias**, **produtos** (com upload de imagem), **endereços**, **compras** e **itens de compra**
- Listagem de produtos por categoria e busca de produto por id
- Cadastro de usuário com senha criptografada (bcrypt), **login com JWT** e rota protegida por token
- Troca de senha (autenticada e via fluxo de recuperação)
- Imagens servidas estaticamente em `/uploads`

**Loja virtual**
- Home com banners em carrossel, categorias e vitrine de produtos filtrada por categoria
- Página de produto com adição ao carrinho
- Carrinho com cálculo de total, botão de checkout com Stripe e tela de pagamento com QR Code Pix (o checkout é só de interface: o backend não tem a rota de pagamento)
- Cadastro e login (validação com Zod e React Hook Form, estado de autenticação via Context + `useReducer`)
- Área "Sua conta": compras realizadas, endereços (cadastro com busca de CEP e exclusão), segurança da conta, edição de nome e troca/recuperação de senha
- Páginas institucionais: Quem somos, Termos de uso e Política de privacidade

**Admin desktop (Electron)**
- Formulário de cadastro de produto com imagem, enviado para a API

## Como rodar localmente

Pré-requisitos: Node.js 18+ e uma instância do MongoDB.

### 1. API

```bash
cd backend
npm install
npm run dev        # nodemon src/index.ts → http://localhost:3001
```

O projeto **não tem `.env.example`**: a URI de conexão do MongoDB está definida diretamente em `backend/src/index.ts`. Para rodar localmente, troque-a pela URI do seu banco.

### 2. Loja virtual

```bash
cd frontend/verdanzin
npm install
npm run dev        # http://localhost:3000
```

A loja consome a API em `http://localhost:3001` (configurado em `src/utils/api.ts`).

### 3. Admin desktop (opcional)

```bash
cd admin
npm install
npm run build      # craco build
npm start          # electron .
```

## Estrutura

```
TCC/
├── backend/                 # API Express + Mongoose
│   ├── src/router.ts        # Definição das rotas
│   ├── src/app/models/      # Schemas: User, Product, Category, Address, Purchase, PurchaseItem
│   └── src/app/useCases/    # Um arquivo por caso de uso (create, list, delete...)
├── frontend/
│   ├── verdanzin/           # Loja virtual em Next.js (versão principal)
│   └── verdan/              # Protótipo inicial em Create React App
├── admin/                   # App desktop Electron para cadastro de produtos
└── my_electron_react_application/, testElectron/, test/   # Experimentos
```

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE).
