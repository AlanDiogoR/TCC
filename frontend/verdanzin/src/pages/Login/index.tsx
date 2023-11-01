import React from 'react';
import logo from '@/assets/imagesLogin/icone_verdan_fundo.png';
import verdan from '@/assets/imagesLogin/verdanItapeva.jpg';
import Image from 'next/image';
import { ContainerLogin, MainContainer, FormContainer, ContainerTitle, TextInfo, InputContainer, VerdanSection } from './userLogin';

import login from './images/log-in.svg';
import Link from 'next/link';
import { useLoginController } from './useLoginController';


export default function UserLogin() {
  const { handleSubmit, register } =useLoginController();

  return (
    <ContainerLogin>
      <MainContainer>
        <header>
          <Image src={logo} width={100} height={50} alt='Logo verdan(um certo verde)' />
        </header>

        <FormContainer
          onSubmit={handleSubmit}
        >
          <ContainerTitle>
            <Image
              src={login}
              style={{
                height: 'auto'
              }}
              alt=''
            />
            <h1>Faça seu login</h1>
          </ContainerTitle>

          <TextInfo >
            Entre com suas informações de cadastro
          </TextInfo>

          <InputContainer className="input">
            <label className="text-info">E-mail</label>
            <input
              type="email"
              placeholder="Digite seu email"
              {...register('email')}
              required
            />
          </InputContainer>

          <InputContainer className="input">
            <label className="text-info">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              {...register('password')}
              required
            />
          </InputContainer>

          <div>
            <span>Esqueci minha senha</span>
          </div>

          <button type="submit">Entrar</button>

          <Link
            href={'./CreateAccount'}
          >
            <p>
              Não tem conta?
            </p>
          </Link>

        </FormContainer>

      </MainContainer>

      <VerdanSection>
        <Image
          src={verdan}
          style={{
            padding: 0,
            height: '99vh',
            width: '100%',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          alt='Foto da loja da verdan em Itapeva-Sp'
        />
      </VerdanSection>
    </ContainerLogin>
  );
}
