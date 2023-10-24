import NavBHome from '@/components/NavBHome/NavBHome';
import { ButtonCreate, ContainerInputs, Container, ContainerPassword, ButtonEdit } from './styles';
import Link from 'next/link';

export default function SecurityAccount() {
  return (
    <>
      <NavBHome/>

      <Container>
        <ContainerPassword>
          <h1>Acesso e segurança</h1>

          <label>A seguir suas informações</label>

          <ContainerInputs>
            <div>
              <strong>Nome:</strong>
              <p>Miguel</p>
            </div>

            <div>
              <ButtonEdit>
                <Link href={'/EditName'}>
                  Editar
                </Link>
              </ButtonEdit>
            </div>
          </ContainerInputs>

          <ContainerInputs>
            <div>
              <strong>E-mail:</strong>
              <p>miguel@gmail.com</p>
            </div>

            <div>
              <ButtonEdit>
                <Link href={'/ResetPassword'}>
                  Editar
                </Link>
              </ButtonEdit>
            </div>
          </ContainerInputs>

          <ContainerInputs>
            <div>
              <strong>Senha:</strong>
              <p>********</p>
            </div>

            <div>
              <ButtonEdit>
                <Link href={'/ResetPassword'}>
                  Editar
                </Link>
              </ButtonEdit>
            </div>
          </ContainerInputs>

          <ButtonCreate>Concluído</ButtonCreate>

        </ContainerPassword>
      </Container>
    </>
  );
}
