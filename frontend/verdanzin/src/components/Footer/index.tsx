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

        <Image
          src={logo}
          width={'160'}
          height={'80'}
          alt='logo verdan'
        />
        <FooterRodape>
          <div>
            <h3>Deixe nos ajudar você</h3>
            <label><a href="#ss">Frete e prazo de entrega</a></label>
            <label>
              <Link href={'../YourAccount'}>
                Sua conta
              </Link>
              </label>
          </div>
          <div>
            <h3>Institcional</h3>
            <label>
              <Link href={'../WhoWeAre'}>
                Quem somos?
              </Link>
            </label>
          </div>
          <div>
            <h3>Privacidade de dados</h3>
            <label><a href="#ss">Política de privacidade</a></label>
            <label><a href="#ss">Termos de uso</a></label>
          </div>
          <div>
            <h3>Pagamentos</h3>
            <label><a href="#ss">Cartão de crédito</a></label>
            <label><a href="#ss">Cartão de débito</a></label>
            <label><a href="#ss">Boleto</a></label>
          </div>
        </FooterRodape>
      </FooterBar>
    </>
  );
}
