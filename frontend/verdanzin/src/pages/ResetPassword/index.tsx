import { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import { ButtonCreate, ContainerInputs, Input, Container, ContainerPassword } from './styles';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '@/utils/api';
import { useAuth } from '@/auth/authContex';
import { User } from '@/types/User';

// Schema para validação usando Zod
const schema = z.object({
  currentPassword: z.string().min(8, 'Senha atual deve ter no mínimo 8 caracteres').nonempty('Campo obrigatório'),
  newPassword: z.string().min(8, 'Nova senha deve ter no mínimo 8 caracteres').nonempty('Campo obrigatório'),
  confirmPassword: z.string().min(8, 'Confirmação de senha deve ter no mínimo 8 caracteres').nonempty('Campo obrigatório'),
});

type FormValues = z.infer<typeof schema>;

export default function ResetPassword() {
  const { state } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Faz a requisição para alterar a senha
      await api.post('/change-password', {
        userId: user?._id,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      console.log('Senha alterada com sucesso!');
    } catch (error) {
      console.error(`Erro ao alterar a senha: ${error}`);
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (error) => {
    console.error('Erro ao validar o formulário:', error);
  };

  return (
    <>
      <NavBar/>

      <Container>
        <ContainerPassword>
          <h1>Alterar senha</h1>

          <label>Use este formulário para alterar a senha da conta</label>

          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <ContainerInputs>
              <p>Senha atual:</p>
              <Input type="password" {...register('currentPassword')} />
              {errors.currentPassword && <span>{errors.currentPassword.message}</span>}
            </ContainerInputs>

            <ContainerInputs>
              <p>Nova senha:</p>
              <Input type="password" {...register('newPassword')} />
              {errors.newPassword && <span>{errors.newPassword.message}</span>}
            </ContainerInputs>

            <ContainerInputs>
              <p>Reinsira a nova senha:</p>
              <Input type="password" {...register('confirmPassword')} />
              {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
            </ContainerInputs>

            <ButtonCreate type="submit">Salvar</ButtonCreate>
          </form>
        </ContainerPassword>
      </Container>
    </>
  );
}
