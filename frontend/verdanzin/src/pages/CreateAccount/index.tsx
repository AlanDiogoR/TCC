import React, { useState } from 'react';
import { ButtonCreate, ContainerAccount, ContainerForm, ContainerInputs, Input } from './styles';
import { api } from '@/utils/api';
import { Footer } from '@/components/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '@/components/NavBar/NavBar';

export default function CreateAccount() {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (newUser.password !== newUser.confirmPassword) {
        toast.error('A senha e a confirmação de senha não coincidem');
        return;
      }

      if (!newUser.name || !newUser.email || !newUser.password || !newUser.confirmPassword) {
        toast.error('Preencha todos os campos');
        return;
      }

      const response = await api.post('/users', {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success('Usuário cadastrado com sucesso');
        setNewUser({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });

      } else {
        toast.error('Erro ao criar a conta');
      }
    } catch (error) {
      toast.error('Erro ao criar a conta');
    }
  };

  return (
    <>
      <NavBar/>

      <ContainerAccount>
        <ContainerForm method='POST' onSubmit={handleCreateAccount}>
          <h1>Criar conta</h1>

          <ContainerInputs>
            <label>Seu nome:</label>
            <Input
              name="name"
              placeholder="Seu nome aqui..."
              value={newUser.name}
              onChange={handleChange}
              required
            />
          </ContainerInputs>

          <ContainerInputs>
            <label>E-mail:</label>
            <Input
              name="email"
              placeholder="Seu e-mail aqui..."
              value={newUser.email}
              onChange={handleChange}
              required
            />
          </ContainerInputs>

          <ContainerInputs>
            <label>Sua senha:</label>
            <Input
              name="password"
              placeholder="Sua senha aqui..."
              type="password"
              value={newUser.password}
              onChange={handleChange}
              required
            />
          </ContainerInputs>

          <ContainerInputs>
            <label>Repita a senha:</label>
            <Input
              name="confirmPassword"
              placeholder="Senha informada anteriormente"
              type="password"
              value={newUser.confirmPassword}
              onChange={handleChange}
              required
            />
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
