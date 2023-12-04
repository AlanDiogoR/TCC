import React from 'react';
import logo from '@/assets/imagesLogin/icone_verdan_fundo.png';
import verdan from '@/assets/imagesLogin/verdanItapeva.jpg';
import Image from 'next/image';
import { ContainerLogin, MainContainer, FormContainer, ContainerTitle, TextInfo, InputContainer, VerdanSection } from './userLogin';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import 'react-toastify/dist/ReactToastify.css';

import login from './images/log-in.svg';
import Link from 'next/link';
import { useLoginController } from './useLoginController';
import { Spinner } from '@/components/Spiner';


export default function UserLogin() {
  const { handleSubmit, register, errors, isPending } = useLoginController();

  return (
    <ContainerLogin>
      <MainContainer>
        <header>
          <Link href={'/'}>
            <Image src={logo} width={100} height={50} alt='Logo verdan(um certo verde)' />
          </Link>
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
            />
            {errors.email && (
              <div>
                <CrossCircledIcon />
                <span>{errors.email.message}</span>
              </div>
            )}

          </InputContainer>

          <InputContainer className="input">
            <label className="text-info">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              {...register('password')}
            />

            {errors.password && (
              <div>
                <CrossCircledIcon />
                <span>{errors.password.message}</span>
              </div>
            )}

          </InputContainer>

          <div>
            <span>Esqueci minha senha</span>
          </div>

          <button type="submit">{isPending ? <Spinner/> : 'Entrar'}</button>

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
