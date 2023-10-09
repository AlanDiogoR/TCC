import React from 'react';
import { ButtonCreate, ContainerAccount, ContainerForm, ContainerInputs, Input } from './styles';
import NavBHome from '@/components/NavBHome/NavBHome';
import { Footer } from '@/components/Footer';


export default function CreateAccount() {
  return (
    <>
      <NavBHome/>

      <ContainerAccount>

        <ContainerForm>
          <h1>Criar conta</h1>

          <ContainerInputs>
            <label>Seu nome:</label>
            <Input
              placeholder='Seu nome aqui...'
            />
          </ContainerInputs>

          <ContainerInputs>
            <label>E-mail:</label>
            <Input
              placeholder='Seu e-mail aqui...'
            />
          </ContainerInputs>

          <ContainerInputs>
            <label>Sua senha:</label>
            <Input
              placeholder='Sua senha aqui...'
            />
          </ContainerInputs>

          <ContainerInputs>
            <label>Repita a senha:</label>
            <Input
              placeholder='Senha informada anteriormente'
            />
          </ContainerInputs>

          <ButtonCreate>
            Criar Conta
          </ButtonCreate>

        </ContainerForm>

      </ContainerAccount>

      <Footer/>

    </>
  );
}
