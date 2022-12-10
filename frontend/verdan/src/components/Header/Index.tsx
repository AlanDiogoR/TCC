import logo from '../../assets/images/logoVerdan.webp';
import { FaSearch } from 'react-icons/fa';
import { FaShoppingBag, FaHeart } from 'react-icons/fa';


import styles from './Header.module.scss';



export function Header() {
  return(
    <header>
      <div className={styles.logo}>
        <img src={logo} alt="Logo verdan Shopping" className={styles.logoImg}/>
      </div>


      <div className={styles.searchBox}>
        <input type="text" className={styles.searchTxt} placeholder="Pesquise aqui"/>
        <a className={styles.searchBtn} href="#ff">
          <i className={styles.searchBtn}>
            <FaSearch/>
          </i>
        </a>
      </div>

      <div className={styles.userLogin}>
        <a href="#js" id={styles.heart}><FaHeart/></a>
        <a href="#jjj"><FaShoppingBag/></a>
      </div>

    </header>
  )
}