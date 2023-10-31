import React from 'react';
import './login.css';

export function LoginAdmin() {
  return (
    <>
     <main>

      <header>
        <img src="./images/logo.svg" alt=""/>
      </header>

      <form>
        <div class="title">
          <img src="./images/log-in.svg" alt=""/>
          <h1>Faça seu login</h1>
        </div>
        
        <p class="text-info" id="subtitle">Entre com suas informações de cadastro</p>

        <div class="input">
          <label for="email" class="text-info">E-mail</label>
          <input type="email" id="email" placeholder="Digite seu email" class="text-info"/>
        </div>

        <div class="input">
          <label for="password" class="text-info">Senha</label>
          <input type="password" id="password" placeholder="Digite sua senha" class="text-info"/>
          <img src="./images/eye.svg" alt=""/>
        </div>

        <div class="input-check">
          <label>
            <div></div>
            <input type="checkbox" id="check"/> 
            <span for="check" class="text-info">Lembre-me</span>             
          </label>
          <span>Esqueci minha senha</span>
        </div>

        <button type="submit">Entrar</button>

      </form>


      </main>
    </>
  );
}