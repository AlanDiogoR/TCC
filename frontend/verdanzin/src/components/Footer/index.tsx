import Image from 'next/image';
import logo  from '@/assets/logo/verdan_logo.png';
import { FooterBar, FooterRodape } from '@/styles/pages/footer';


export function Footer() {
  return (
    <>
      <FooterBar>
        <Image
          src={logo}
          width={'160'}
          height={'80'}
          alt='logo verdan'
        />
        <FooterRodape>
          <div>
            <h3>Deixe nos ajudar você</h3>
            <label><a href="../../pages/atendimento/atendimento.tsx">Central de atendimento</a></label>
            <label><a href="#ss">Troca e/ou devoluções</a></label>
            <label><a href="#ss">Frete e prazo de entrega</a></label>
            <label><a href="#ss">Sua conta</a></label>
          </div>
          <div>
            <h3>Institcional</h3>
            <label><a href="#ss">Quem somos?</a></label>
            <label><a href="#ss">Trabalhe conosco</a></label>
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