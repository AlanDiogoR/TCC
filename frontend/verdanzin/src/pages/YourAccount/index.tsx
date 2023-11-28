import { AccountConatiner, DivImage, DivLabelText, NavAccount } from './style';
import endereco from './assets/endereco_logo3.png';
import seguranca from './assets/seguranxa.png';
import pedidos from './assets/pedidos2.png';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '@/components/NavBar/NavBar';
import { useAuth } from '@/auth/authContex';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function YourAccount() {
  const { state, dispatch } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });

    if (state.user == null) {
      toast.success('Você saiu da sua conta!');
      router.push('Login');
    }
  };

  return (
    <>
      <NavBar/>

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
            href={'/SecurityAccount'}
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
            href={'/YourAdress'}
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

        <button onClick={handleLogout}>Sair</button>

      </AccountConatiner>
    </>
  );
}
