import Image from 'next/image';
import logo  from '@/assets/logo/verdan_logo.png';
import { ButtonHome, FooterBar, FooterRodape } from '@/styles/pages/footer';
import Link from 'next/link';


export function Footer() {
  return (
    <>
      <FooterBar>

        <ButtonHome>
          <Link href={'#'}>
            Voltar ao inicio
          </Link>
        </ButtonHome>

        <Link href={'/'}>
          <Image
            src={logo}
            width={'160'}
            height={'80'}
            alt='logo verdan'
          />
        </Link>
        <FooterRodape>
          <div>
            <h3>Deixe nos ajudar você</h3>
            <label>
              <Link href={'../YourPurchases'}>Frete e Prazo de entrega</Link>
            </label>
            <label>
              <Link href={'../YourAccount'}>
                Sua conta
              </Link>
            </label>
          </div>
          <div>
            <h3>Institucional</h3>
            <label>
              <Link href={'../WhoWeAre'}>
                Quem somos?
              </Link>
            </label>
          </div>
          <div>
            <h3>Privacidade de dados</h3>
            <label>
              <Link href={'../PrivacyP'}>Política de privacidade</Link>
            </label>
            <label>
              <Link href={'../Therms'}>Termos de uso</Link>
            </label>
          </div>
          <div>
            <h3>Pagamentos</h3>
            <label>
              <a title='Você pode pagar com seus cartões' >Cartoes</a>
            </label>
          </div>
        </FooterRodape>
      </FooterBar>
    </>
  );
}
