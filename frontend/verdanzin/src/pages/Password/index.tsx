import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { ButtonCreate, ContainerModal, Modal } from './style';
import { InputContainer } from '../Login/userLogin';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import  emailjs  from '@emailjs/browser';
import { useState } from 'react';
import { useRouter } from 'next/router';

const schema = z.object({
  email: z.string().nonempty('E-mail é obrigatório!').email('Informe um e-mail válido!'),
  name: z.string().nonempty('Nome é obrigatório!'),
});

type FormData = z.infer<typeof schema>;

export default function Password() {
  const [cod, setCod] = useState<string | number>('');
  const router = useRouter();


  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const number = 244982;

  const onSubmit = async (data: FormData) => {

    const template = {
      to_name: data.name,
      email: data.email,
      cod: number,
    };

    emailjs.send('service_tnvf2j4', 'template_xpqak8b', template, 'aquZ5jG5q0zefWn3d');

    toast.success('Email enviado');

  };

  const handleT = async () => {
    if (number != cod) {
      toast.error('Código incorreto. Tente novamente.');
      return;
    } else {
      try {
        router.push('NewPassword');
        toast.success('Voê redirecionado para a redefinição de senha');
      } catch (error) {
        console.error(error);
        toast.error('Erro ao processar a solicitação. Tente novamente mais tarde.');
      }
    }


  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCod(value);
  };

  return (
    <>
      <ContainerModal>
        <Modal onSubmit={handleSubmit(onSubmit)}>
          <h1>Recupere a senha</h1>

          <InputContainer className="input">
            <label className="text-info">E-mail</label>
            <input
              type="email"
              placeholder="Digite seu email"
              {...register('email')}
            />
            {errors.email && (
              <div>
                <CrossCircledIcon />
                <span>{errors.email.message}</span>
              </div>
            )}
          </InputContainer>

          <InputContainer className="input">
            <label className="text-info">Nome</label>
            <input
              type="text"
              placeholder="Informe seu nome"
              {...register('name')}
            />
            {errors.name && (
              <div>
                <CrossCircledIcon />
                <span>{errors.name.message}</span>
              </div>
            )}

          </InputContainer>

          <InputContainer className="input">
            <label className="text-info">Código</label>
            <input
              name='cod'
              placeholder="Informe o código "
              value={cod || ''}
              onChange={handleChange}
            />

            <ButtonCreate onClick={handleT}>Confirmar</ButtonCreate>
            <ButtonCreate type='submit'>Enviar código</ButtonCreate>

          </InputContainer>
        </Modal>
      </ContainerModal>
    </>
  );
}
