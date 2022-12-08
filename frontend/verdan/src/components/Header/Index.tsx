import logo from '../../assets/images/logoVerdan.webp';
import { FaSearch } from 'react-icons/fa';

import styles from './Header.module.scss';



export function Header() {
  return(
    <header>
      <div className={styles.logo}>
        <img src={logo} alt="Logo verdan Shopping" className={styles.logoImg}/>
      </div>

      <div className={styles.menuNav}>
        <nav className={styles.nav}>
           <ul>
            <li><a href='#fw'>Produtos</a></li>
            <li><a href='#op'>Localização</a></li>
            <li><a href='jjh'>Avaliação</a></li>
            <li><a href='madioca'>Contatos</a></li>
            <li><a href="#madioca">Login</a></li>
            </ul>
        </nav>
        
      </div>

      <div className={styles.containerPesquisar}>
        <div className={styles.pesquisar}>
          <input type="text"  className={styles.pesquisarTxt}/>
          <a href="#hh" className={styles.pesquisarBtn}>
            <FaSearch/>
          </a>{/*concertar o css da lupa*/}
        </div>
      </div>

    </header>
  )
}