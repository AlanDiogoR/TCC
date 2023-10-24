import NavBHome from '@/components/NavBHome/NavBHome';
import { Container, ContainerPassword } from './styles';
import { ContainerInputs, Input } from '../CreateAccount/styles';

export default function ResetPassword() {
  return (
    <>
      <NavBHome/>

      <Container>
        <ContainerPassword>
          <h1>Alterar senha</h1>

          <label>Use este formulário para alterar a senha da verdan</label>

          <ContainerInputs>
            <p>Senha atual:</p>
            <Input type="text" />
          </ContainerInputs>

          <ContainerInputs>
            <p>Senha nova:</p>
            <Input type="text" />
          </ContainerInputs>

          <ContainerInputs>
            <p>Reinsira a nova senha:</p>
            <Input type="text" />
          </ContainerInputs>

          <button>Salvar</button>

        </ContainerPassword>
      </Container>
    </>
  );
}
