import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonCreate, ContainerAccount, ContainerForm, ContainerInputs, Input } from './styles';
import { api } from '@/utils/api';
import { Footer } from '@/components/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '@/components/NavBar/NavBar';
import { useAuth } from '@/auth/authContex';
import { z } from 'zod';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/router';

const schema = z.object({
  name: z.string().min(2, { message: 'O nome deve ter no mínimo 2 caracteres' }).max(255, { message: 'O nome deve ter no máximo 255 caracteres' }).nonempty({ message: 'Por favor, forneça um nome' }),
  email: z.string().email({ message: 'Por favor, forneça um e-mail válido' }).nonempty({ message: 'Por favor, forneça um e-mail' }),
  password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }).max(255, { message: 'A senha deve ter no máximo 255 caracteres' }).nonempty({ message: 'Por favor, forneça uma senha' }),
  confirmPassword: z.string().min(8, { message: 'A confirmação de senha deve ter no mínimo 6 caracteres' }).max(255, { message: 'A confirmação de senha deve ter no máximo 255 caracteres' }).nonempty({ message: 'Por favor, forneça uma confirmação de senha' }),
});

type FormData = z.infer<typeof schema>;


export default function CreateAccount() {
  const { state, dispatch } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const logein = (user: string) => {
    dispatch({ type: 'LOGIN', payload: { user, token: '' } });
  };

  const handleCreateAccount = async (data: any) => {
    try {
      if (data.password !== data.confirmPassword) {
        toast.error('A senha e a confirmação de senha não coincidem');
        return;
      }

      const response = await api.post('/users', {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success('Usuário cadastrado com sucesso');

        logein(data.email);
        router.push('/');
      } else {
        toast.error('Erro ao criar a conta');
      }
    } catch (error) {
      toast.error('Erro ao criar a conta');
    }
  };

  return (
    <>
      <NavBar />
      <ContainerAccount>
        <ContainerForm onSubmit={handleSubmit(handleCreateAccount)}>
          <h1>Criar conta</h1>

          <ContainerInputs>
            <label>Seu nome:</label>
            <Input
              {...register('name')}
              placeholder="Seu nome aqui..."
            />
            {errors.name && (
              <div>
                <CrossCircledIcon />
                <span>{errors.name.message}</span>
              </div>
            )}
          </ContainerInputs>

          <ContainerInputs>
            <label>E-mail:</label>
            <Input
              {...register('email')}
              type="email"
              placeholder="Seu e-mail aqui..."
            />
            {errors.email && (
              <div>
                <CrossCircledIcon />
                <span>{errors.email.message}</span>
              </div>
            )}
          </ContainerInputs>

          <ContainerInputs>
            <label>Sua senha:</label>
            <Input
              {...register('password')}
              placeholder="Sua senha aqui..."
              type="password"
            />
            {errors.password && (
              <div>
                <CrossCircledIcon />
                <span>{errors.password.message}</span>
              </div>
            )}
          </ContainerInputs>

          <ContainerInputs>
            <label>Repita a senha:</label>
            <Input
              {...register('confirmPassword')}
              placeholder="Senha informada anteriormente"
              type="password"
            />
            {errors.confirmPassword && (
              <div>
                <CrossCircledIcon />
                <span>{errors.confirmPassword.message}</span>
              </div>
            )}
          </ContainerInputs>

          <ButtonCreate type='submit'>
            Criar Conta
          </ButtonCreate>
        </ContainerForm>
      </ContainerAccount>

      <Footer />
    </>
  );
}
