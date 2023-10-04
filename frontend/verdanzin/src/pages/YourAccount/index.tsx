import { AccountConatiner, DivImage, DivLabelText, DivOptions, NavAccount } from './style';
import endereco from './assets/endereco_logo3.png';
import seguranca from './assets/seguranxa.png';
import pedidos from './assets/pedidos2.png';
import Image from 'next/image';
import NavBHome from '@/components/NavBHome/NavBHome';
import Link from 'next/link';

export default function YourAccount() {
  return (
    <>
      <NavBHome/>

      <AccountConatiner>
        <h1>Sua conta</h1>

        <NavAccount>

          <Link
            href={'/'}
          >
            <DivImage>
              <Image
                src={pedidos}
                width={50}
                height={50}
                alt=''
              />
            </DivImage>

            <DivLabelText>
              <h2>Seus pedidos</h2>
              <label>Ver pedidos, devolver ou comprar produtos novamente</label>
            </DivLabelText>

          </Link>

          <Link
            href={'/'}
          >
            <DivImage>
              <Image
                src={seguranca}
                width={50}
                height={50}
                alt=''
              />
            </DivImage>

            <DivLabelText>
              <h2>Segurança</h2>
              <label>Gerenciar senha e e-mail</label>
            </DivLabelText>
          </Link>  

          <Link
            href={'/'}
          >

            <DivImage>
              <Image
                src={endereco}
                width={50}
                height={48}
                style={{ marginTop: '2px'}}
                alt=''
              />
            </DivImage>

            <DivLabelText>
              <h2>Endereços</h2>
              <label>Alterar endereços para pedidos</label>
            </DivLabelText>

          </Link>

        </NavAccount>

      </AccountConatiner>
    </>
  );
}
