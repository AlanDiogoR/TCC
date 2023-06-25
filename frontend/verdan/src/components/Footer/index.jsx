import logo from '../../assets/images/logoVerdan.webp';
import styles from './styles.module.scss'

export function Footer() {
  return (
    <footer className={styles.rodapePai}>
      <img src={logo} alt="logo verdan" />

      <div className={styles.rodape}>
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
        
      </div>

    </footer>
  )
}