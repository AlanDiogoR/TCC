import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import { SigninParams } from '@/services/authService/signin';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useAuth } from '@/auth/authContex';

const schema = z.object({
  email: z.string().nonempty('E-mail é obrigatório!').email('Informe um e-mail válido!'),
  password: z.string().nonempty('A senha é obrigatória!').min(8, 'A senha deve conter no mínimo oito dígito!'),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const { dispatch } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { token } = await mutateAsync(data);
      dispatch({ payload: { user: data.email, token: token }, type: 'LOGIN' });
      toast.success('Login efetuado com sucesso!');
      router.push('/');
    } catch {
      toast.error('Credenciais inválidas!');
    }
  });

  return { handleSubmit, register, errors, isPending };
}
