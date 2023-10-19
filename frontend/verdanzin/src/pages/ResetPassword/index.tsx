import NavBHome from '@/components/NavBHome/NavBHome';
import { ContainerPassword } from './styles';

export default function ResetPassword() {
  return (
    <>
      <NavBHome/>

      <ContainerPassword>
        <h1>Alterar senha</h1>

        <label>Use este formulário para alterar a senha da verdan</label>

        <>
          <p>Senha atual:</p>
          <input type="text" />
        </>

        <>
          <p>Senha nova:</p>
          <input type="text" />
        </>

        <>
          <p>Reinsira a nova senha:</p>
          <input type="text" />
        </>

        <button>Salvar</button>

      </ContainerPassword>
    </>
  );
}
