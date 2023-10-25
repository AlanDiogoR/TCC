import { Container, ContainerAdd, ContainerPassword, Text } from './style';
import NavBHome from '@/components/NavBHome/NavBHome';
import { Footer } from '@/components/Footer';


export default function YourAdress() {
  return (
    <>
      <NavBHome/>
      <Text>Seus endereços</Text>
      <Container>
        <ContainerAdd>
          <p>+</p>
          <strong>Adcionar endereço</strong>
        </ContainerAdd>

        <ContainerPassword>
          <header>Endereço padrão: Verdan</header>
          <p>Alan Diogo</p>
          <p>Avenida 1 08</p>
          <p>08 Jardim da Serra III</p>
          <p>Fartura, São Paulo 18873432</p>
          <p>Brasil</p>
          <p>telefone: 14998931883</p>

          <div>
            <button>Alterar</button>
            <button>Excluir</button>
          </div>
        </ContainerPassword>
      </Container>


      <Footer/>
    </>
  );
}
