import NavBar from '@/components/NavBar/NavBar';
import { AccountConatiner, DivOptions, NavAccount } from './style';
import { Footer } from '@/components/Footer';
import slates from './assets/acompanhamento-de-pedidos.png'
import Image from 'next/image';

export default function YourAccount() {
  return (
    <>
      <NavBar/>

      <AccountConatiner>
        <h1>Sua conta</h1>

        <NavAccount>

          <DivOptions>
            <div>
              <h2>Seus pedidos</h2>
              <label>Ver pedidos, devolver ou comprar produtos novamente</label>
            </div>

            <div>
              <Image src={slates} alt=''/>
            </div>
          </DivOptions>

          <DivOptions>
            <h2>Segurança</h2>
            <label>Gerenciar senha e e-mail</label>
          </DivOptions>

          <DivOptions>
            <h2>Endereços</h2>
            <label>Alterar endereços para pedidos</label>
          </DivOptions>

        </NavAccount>

      </AccountConatiner>
    </>
  );
}
