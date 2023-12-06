import { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import { ButtonCreate, ContainerInputs, Container, ContainerPassword, ButtonEdit } from './styles';
import Link from 'next/link';
import { api } from '@/utils/api';
import { User } from '@/types/User';
import { useAuth } from '@/auth/authContex';
import { useRouter } from 'next/router';

export default function SecurityAccount() {
  const { state } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/users');
        const allUsers: User[] = response.data;

        const foundUser = allUsers.find(u => u.email === state.user);

        if (foundUser) {
          setUser(foundUser);
        } else {
          console.log(`Usuário com o email ${state.user} não encontrado.`);
        }
      } catch (error) {
        console.error(`Erro ao buscar os usuários: ${error}`);
      }
    };

    fetchUserData();
  }, [state.user]);

  return (
    <>
      <NavBar />

      <Container>
        <ContainerPassword>
          <h1>Acesso e segurança</h1>

          <label>A seguir suas informações</label>

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

          <ButtonCreate onClick={() => router.push('/')}>Concluído</ButtonCreate>

        </ContainerPassword>
      </Container>
    </>
  );
}
