import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/router';
import axios from 'axios';
import { api } from '@/utils/api';
import { useAuth } from '@/auth/authContex';
import { useEffect, useState } from 'react';
import { User } from '@/types/User';
import NavBar from '@/components/NavBar/NavBar';
import { ButtonCreate, ContainerAdress, ContainerForm, ContainerInputs, Input } from './styles';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { toast } from 'react-toastify';

const schema = z.object({
  zipCode: z.string().nonempty('CEP é obrigatório'),
  city: z.string().nonempty('Cidade é obrigatória'),
  state: z.string().nonempty('Estado é obrigatório'),
  neighborhood: z.string().nonempty('Bairro é obrigatório'),
  street: z.string().nonempty('Rua é obrigatória'),
  numberHouse: z.string().nonempty('Número da casa é obrigatório'),
});

type FormData = z.infer<typeof schema>;

export default function AddAddressPage() {
  const { state } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [user, setUser] = useState<User | null>(null);

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

  const onSubmit = async (data: FormData) => {
    try {
      const cepData = await fetchCepData(data.zipCode);

      const fullAddressData = {
        ...data,
        userId: user?._id,
        city: cepData.city,
        state: cepData.state,
        neighborhood: cepData.neighborhood,
        street: cepData.street,
        zipCode: cepData.zipCode,
        numberHouse: 2
      };

      await api.post('/addresses', fullAddressData);

      toast.success('Endereço adcionado com sucesso!');

      router.push('/YourAdress');
    } catch (error) {
      console.error('Erro ao adicionar endereço:', error);
      toast.error('Erro ao adcionar endereço!');
    }
  };

  const fetchCepData = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return {
        city: response.data.localidade,
        state: response.data.uf,
        neighborhood: response.data.bairro,
        street: response.data.logradouro,
        zipCode: response.data.cep,
      };
    } catch (error) {
      console.error('Erro ao buscar dados do CEP:', error);
      throw new Error('Erro ao buscar dados do CEP');
    }
  };

  return (
    <>
      <NavBar/>
      <ContainerAdress>
        <ContainerForm onSubmit={handleSubmit(onSubmit)}>
          <ContainerInputs>
            <label>CEP:</label>
            <Input
              {...register('zipCode')}
            />
            {errors.zipCode && (
              <div>
                <CrossCircledIcon />
                <span>{errors.zipCode.message}</span>
              </div>
            )}
          </ContainerInputs>

          <ContainerInputs>
            <label>Cidade:</label>
            <Input
              {...register('city')}
            />
            {errors.zipCode && (
              <div>
                <CrossCircledIcon />
                <span>{errors.city?.message}</span>
              </div>
            )}
          </ContainerInputs>

          <ContainerInputs>
            <label>Estado:</label>
            <Input
              {...register('state')}
            />
            {errors.zipCode && (
              <div>
                <CrossCircledIcon />
                <span>{errors.state?.message}</span>
              </div>
            )}
          </ContainerInputs>

          <ContainerInputs>
            <label>Bairro:</label>
            <Input
              {...register('neighborhood')}
            />
            {errors.zipCode && (
              <div>
                <CrossCircledIcon />
                <span>{errors.neighborhood?.message}</span>
              </div>
            )}
          </ContainerInputs>

          <ContainerInputs>
            <label>Rua:</label>
            <Input
              {...register('street')}
            />
            {errors.zipCode && (
              <div>
                <CrossCircledIcon />
                <span>{errors.street?.message}</span>
              </div>
            )}
          </ContainerInputs>

          <ContainerInputs>
            <label>Número da casa:</label>
            <Input
              {...register('numberHouse')}
            />
            {errors.zipCode && (
              <div>
                <CrossCircledIcon />
                <span>{errors.numberHouse?.message}</span>
              </div>
            )}
          </ContainerInputs>

          <ButtonCreate type="submit">
            Adicionar Endereço
          </ButtonCreate>

        </ContainerForm>
      </ContainerAdress>
    </>
  );
}
