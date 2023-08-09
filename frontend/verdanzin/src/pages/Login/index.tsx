import React from 'react';
import logo  from '@/assets/imagesLogin/icone_verdan_fundo.png';
import Image from 'next/image';



export default function UserLogin() {
  return (
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
        <div className="title">
          <Image
            src={logo}
            width={160}
            height={80}
            alt=''
          />
          <h1>Faça seu login</h1>
        </div>

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
  );
}

