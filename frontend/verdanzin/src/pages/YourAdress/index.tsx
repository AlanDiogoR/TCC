import { Container, ContainerAdd, ContainerPassword, Text } from './style';
import NavBar from '@/components/NavBar/NavBar';
import { Footer } from '@/components/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/auth/authContex';
import { User } from '@/types/User';
import { api } from '@/utils/api';
import { Adress } from '@/types/Adress';
import React from 'react';
import { toast } from 'react-toastify';

export default function YourAddressPage() {
  const [address, setAddress] = useState<Adress | null>(null);
  const router = useRouter();
  const { state } = useAuth();


  const handleAddAddressClick = () => {
    router.push('/AddAddress');
  };

  const handleDeleteAddress = () => {
    api.delete(`/addresses/${address?._id}`);
    toast.success('Endereço excçuido com sucesso!');
  };

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await api.get('/users');
        const allUsers: User[] = userResponse.data;

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

    const fetchAddressData = async () => {
      try {
        const addressResponse = await api.get('/addresses');
        const allAddresses: Adress[] = addressResponse.data;

        if (Array.isArray(allAddresses)) {
          const foundAddress = allAddresses.find(address => address.userId === user?._id);

          if (foundAddress) {
            setAddress(foundAddress);
          } else {
            console.log(`Endereço com o id: ${user?._id} não encontrado.`);
          }
        } else {
          console.log('Os endereços não são um array.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
    fetchAddressData();
  }, [state.user, user?._id]);



  return (
    <>
      <NavBar />
      <Text>Seus endereços</Text>
      <Container>
        <ContainerAdd onClick={handleAddAddressClick}>
          <p>+</p>
          <strong>Adicionar endereço</strong>
        </ContainerAdd>

        {!address ? (
          null
        ) : (
          <ContainerPassword>
            <header>Endereço padrão: Verdan</header>
            <p>{user?.email.split('@')[0]}</p>
            <p>{address.street}</p>
            <p>{address.neighborhood}</p>
            <p>{address.city}, {address.state} {address.ZipCode}</p>

            <div>
              <button>Alterar</button>
              <button onClick={handleDeleteAddress}>Excluir</button>
            </div>
          </ContainerPassword>
        )}
      </Container>

      <Footer />
    </>
  );
}
