import { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import { ButtonCreate, ContainerInputs, Container, ContainerPassword, ButtonEdit } from './styles';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { api } from '@/utils/api';
import { User } from '@/types/User';
import { useAuth } from '@/auth/authContex';

export default function SecurityAccount({ user: initialUser }: { user: User }) {
  const { state } = useAuth();
  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/users');
        const allUsers: User[] = response.data;

        // Encontrar o usuário pelo email
        const foundUser = allUsers.find(u => u.email === state.user);

        if (foundUser) {
          setUser(foundUser);
        } else {
          console.log(`Usuário com o email ${state.user} não encontrado.`);
        }
      } catch (error) {
        console.log(`Erro ao buscar os usuários: ${error}`);
        // Você pode tratar erros de busca dos usuários aqui
      }
    };

    if (state.user && !user) {
      // Se o estado do usuário existir e o estado local do usuário ainda não foi definido, busca os usuários
      fetchUser();
    }
  }, [state.user, user]);

  return (
    <>
      <NavBar/>

      <Container>
        <ContainerPassword>
          <h1>Acesso e segurança</h1>

          <label>A seguir suas informações</label>

          <ContainerInputs>
            <div>
              <strong>Nome:</strong>
              <p>{user?.name}</p>
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
              <p>{state.user}</p>
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

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await api.get('/users');
    const userData = response.data;

    const user: User = {
      _id: userData._id || null,
      name: userData.name || null,
      email: userData.email || null,
      password: userData.password || null,
    };

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.log(`Erro ao buscar os usuários: ${error}`);
    return {
      notFound: true,
    };
  }
};
