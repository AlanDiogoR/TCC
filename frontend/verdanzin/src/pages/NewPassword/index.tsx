import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ButtonCreate, ContainerModal, Modal } from './styles';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { InputContainer } from '../Login/userLogin';
import { api } from '@/utils/api';
import { User } from '@/types/User';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const schema = z.object({
  email: z.string().email('Informe um e-mail válido').nonempty('E-mail é obrigatório'),
  newPassword: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres').nonempty('Nova senha é obrigatória')
});

type SchemaType = typeof schema;
type FormData = z.infer<SchemaType>;

export default function NewPassword() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();


  const email = watch('email');

  const [user, setUser] = React.useState<User | null>(null);

  const fetchUserData = async (email: string) => {
    try {
      const userResponse = await api.get('/users');
      const allUsers: User[] = userResponse.data;

      const foundUser = allUsers.find(u => u.email === email);

      if (foundUser) {
        setUser(foundUser);
      } else {
        console.log(`Usuário com o email ${email} não encontrado.`);
      }
    } catch (error) {
      console.error(`Erro ao buscar os usuários: ${error}`);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await api.patch('/users/changePassword', {
        userId: user?._id,
        newPassword: data.newPassword,
      });

      const result = response.data;

      if (result.success) {
        toast.success('Senha alterada com sucesso!');
        router.push('Login');
      } else {
        toast.error('Erro ao alterar a senha. Tente novamente.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao processar a solicitação. Tente novamente mais tarde.');
    }
  };

  return (
    <ContainerModal>
      <Modal onSubmit={handleSubmit(onSubmit)}>
        <h1>Recupere a senha</h1>

        <InputContainer className="input">
          <label className="text-info">E-mail:</label>
          <input
            type="email"
            placeholder="Digite seu email"
            {...register('email', {
              onChange: (e) => fetchUserData(e.target.value),
            })}
          />
          {errors.email && (
            <div>
              <CrossCircledIcon />
              <span>{errors.email.message}</span>
            </div>
          )}
        </InputContainer>

        <InputContainer className="input">
          <label className="text-info">Nova senha:</label>
          <input
            type="password"
            placeholder="Informe nova senha"
            {...register('newPassword')}
          />
          {errors.newPassword && (
            <div>
              <CrossCircledIcon />
              <span>{errors.newPassword.message}</span>
            </div>
          )}

          <ButtonCreate type='submit'>Confirmar</ButtonCreate>
        </InputContainer>

      </Modal>
    </ContainerModal>
  );
}
