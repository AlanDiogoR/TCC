import React from 'react';
import logo from '@/assets/imagesLogin/icone_verdan_fundo.png';
import verdan from '@/assets/imagesLogin/verdanItapeva.jpg';
import Image from 'next/image';
import { ContainerLogin, MainContainer, FormContainer, ContainerTitle, TextInfo, InputContainer, VerdanSection } from './userLogin';

import login from './images/log-in.svg';
import eye from './images/eye.svg';


export default function UserLogin() {
  return (
    <ContainerLogin>
      <MainContainer>
        <header>
          <Image src={logo} width={100} height={50} alt='Logo verdan(um certo verde)' />
        </header>

        <FormContainer>
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

          <TextInfo className="text-info" id="subtitle">
            Entre com suas informações de cadastro
          </TextInfo>

          <InputContainer className="input">
            <label className="text-info">E-mail</label>
            <input type="email" id="email" placeholder="Digite seu email" className="text-info" />
          </InputContainer>

          <InputContainer className="input">
            <label className="text-info">Senha</label>
            <input type="password" id="password" placeholder="Digite sua senha" className="text-info" />
          </InputContainer>

          <div >
            <span>Esqueci minha senha</span>
          </div>

          <button type="submit">Entrar</button>
          <p>
            Não tenho conta? <a href="#">Registre-se</a>
          </p>

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





/*import React from 'react';
import logo  from '@/assets/imagesLogin/icone_verdan_fundo.png';
import Image from 'next/image';
import { ContainerLogin, ContainerTitle } from './userLogin';



export default function UserLogin() {
  return (
    <ContainerLogin>

      <main>
        <header>
          <Image
            src={logo}
            width={160}
            height={80}
            alt=''
          />
        </header>

        <form>
          <ContainerTitle>
            <Image
              src={logo}
              width={160}
              height={80}
              alt=''
            />
            <h1>Faça seu login</h1>
          </ContainerTitle>

          <p className="text-info" id="subtitle">
            Entre com suas informações de cadastro
          </p>

          <div className="input">
            <label className="text-info">E-mail</label>
            <input type="email" id="email" placeholder="Digite seu email" className="text-info" />
          </div>

          <div className="input">
            <label className="text-info">Senha</label>
            <input type="password" id="password" placeholder="Digite sua senha" className="text-info" />
            <Image
              src={logo}
              width={160}
              height={80}
              alt=''
            />
          </div>

          <div className="input-check">
            <label>
              <div></div>
              <input type="checkbox" id="check" />
              <span  className="text-info">
                Lembre-me
              </span>
            </label>
            <span>Esqueci minha senha</span>
          </div>

          <button type="submit">Entrar</button>
          <p>
            Não tenho conta? <a href="#">Registre-se</a>
          </p>
        </form>
      </main>

    </ContainerLogin>
  );
}

*/
