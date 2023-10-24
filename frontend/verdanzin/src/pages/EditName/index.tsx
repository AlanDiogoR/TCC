import NavBHome from '@/components/NavBHome/NavBHome';
import { ButtonCreate, ContainerInputs, Input, Container, ContainerPassword } from './styles';

export default function EditName() {
  return (
    <>
      <NavBHome/>

      <Container>
        <ContainerPassword>
          <h1>Alterar nome</h1>

          <label>Se quiser alterar o nome associado á sua conta de cliente Verdan, você poderá fazê-lo a seguir. Lembre-se de clicar no botão <strong>Salvar</strong> quando tiver concluído.</label>

          <ContainerInputs>
            <p>Novo nome:</p>
            <Input type="text" placeholder='nome' />
          </ContainerInputs>

          <ButtonCreate>Salvar</ButtonCreate>

        </ContainerPassword>
      </Container>
    </>
  );
}
