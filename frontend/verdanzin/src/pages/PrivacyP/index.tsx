import { Footer } from '@/components/Footer';
import NavBar from '@/components/NavBar/NavBar';
import { Container, ContainerSecurity } from './styles';

export default function PrivacyP() {
  return (
    <>
      <NavBar/>

      <Container>
        <ContainerSecurity>
          <h1>Política de Privacidade🔐</h1>
          <div>
            <h2>JSON Web Tokens (JWT)</h2>
            <p>Nosso site utiliza o JSON Web Tokens (JWT), um formato compacto e autossuficiente que representa informações de forma verificável e confiável. O JWT é amplamente utilizado para autenticação e autorização em sistemas de computador, especialmente em aplicações web e serviços web.</p>
            <p>O JWT é essencial para garantir a segurança e proteger recursos, além de controlar o acesso de usuários.</p>
          </div>
        </ContainerSecurity>

        <ContainerSecurity>
          <div>
            <h2>Bcrypt</h2>
            <p>Utilizamos o método Bcrypt para criptografar senhas ou dados informados, comparando-os com os dados armazenados no banco de dados. O método Bcrypt garante segurança ao encriptar a senha informada e compará-la com a senha encriptada armazenada.</p>
          </div>
          <h1>Criptografia👨‍💻</h1>
        </ContainerSecurity>


        <ContainerSecurity>
          <h1>Segurança🛡</h1>
          <div>
            <h2>Hash</h2>
            <p>O código Hash é uma forma de criptografar dados, gerando uma criptografia em base hexadecimal (números 0-9 e letras A-F). Essa criptografia é irreversível, e qualquer alteração no código afetará a integridade dos dados.</p>
            <p>O Hash também serve para compactar informações em um tamanho padrão, geralmente em 64 caracteres, dependendo do algoritmo utilizado.</p>
          </div>
        </ContainerSecurity>

        <ContainerSecurity>
          <div>
            <h2>Dados coletados📱</h2>
            <p>Nós coletamos informações pessoais de nossos usuários para proporcionar uma experiência segura e personalizada. Essas informações podem incluir nome, endereço de e-mail, e outras informações relevantes.</p>
          </div>
          <h1>Informaçoes</h1>
        </ContainerSecurity>

      </Container>

      <Footer/>

    </>
  );
}
