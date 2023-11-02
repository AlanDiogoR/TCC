import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().nonempty().email(),
  password: z.string().nonempty().min(8),
});

type FormData =   {
  email: string;
  password: string;
};

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit
  } = useForm<FormData>();

  const handleSubmit = hookFormHandleSubmit((data) => {
    const result = schema.safeParse(data);

  });

  return { handleSubmit, register };
}
