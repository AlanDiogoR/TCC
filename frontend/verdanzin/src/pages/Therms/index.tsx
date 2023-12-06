import { Footer } from '@/components/Footer';
import NavBar from '@/components/NavBar/NavBar';
import { Container, ContainerTerms } from './styles';

export default function TermsOfUse() {
  return (
    <>
      <NavBar />

      <Container>
        <ContainerTerms>
          <h1>Termos de Uso</h1>
          <div>
            <h2>Aceitação dos Termos</h2>
            <p>Ao acessar e utilizar nosso site, você concorda com estes Termos de Uso. Se você não concorda com esses termos, por favor, não utilize nosso site.</p>
          </div>
        </ContainerTerms>

        <ContainerTerms>
          <div>
            <h2>Coleta de Informações</h2>
            <p>Para utilizar nossos serviços, você concorda em fornecer informações precisas, atuais e completas, incluindo, mas não se limitando a, nome, endereço de e-mail, senha e informações de cartão de crédito. Estamos em conformidade com a Lei Geral de Proteção de Dados (LGPD).</p>
          </div>
          <h1>Informações Pessoais🔐</h1>
        </ContainerTerms>

        <ContainerTerms>
          <h1>Uso Responsável🚀</h1>
          <div>
            <h2>Uso Responsável</h2>
            <p>Você concorda em utilizar nosso site de forma responsável, respeitando as leis e regulamentos aplicáveis. Não é permitido o uso de nosso site para atividades ilegais ou fraudulentas.</p>
          </div>
        </ContainerTerms>

        <ContainerTerms>
          <div>
            <h2>Segurança da Conta</h2>
            <p>Você é responsável pela segurança de sua conta, incluindo a confidencialidade da senha. Informe-nos imediatamente sobre qualquer uso não autorizado de sua conta. Estamos em conformidade com as diretrizes de segurança da Lei Geral de Proteção de Dados (LGPD).</p>
          </div>
          <h1>Segurança da Conta🔒</h1>
        </ContainerTerms>
      </Container>

      <Footer />
    </>
  );
}
