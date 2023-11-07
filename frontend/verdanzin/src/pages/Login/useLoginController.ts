import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().nonempty('E-mail é obrigatório!').email('Informe um e-mail válido!'),
  password: z.string().nonempty('A senha é obrigatória!').min(8, 'A senha deve conter no mínimo oito dígito!'),
});

type FormData =   z.infer<typeof schema>;

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log('Chama api:', data);

  });

  return { handleSubmit, register, errors };
}
