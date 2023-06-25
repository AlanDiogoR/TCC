import logo from '../../assets/images/logoVerdan.webp';
import { FaSearch } from 'react-icons/fa';

import { FaRegUser, FaRegHeart, FaSortDown } from 'react-icons/fa';

import { FiShoppingCart } from 'react-icons/fi'


import styles from './Header.module.scss';



export function Header() {
  return(
    <header>
      <div className={styles.logo}>
        <img src={logo} alt="Logo verdan Shopping" className={styles.logoImg}/>
      </div>


      <div className={styles.searchBox}>
        <button>
          todos 
          <FaSortDown/>
        </button>
        <input type="text" className={styles.searchTxt} placeholder="Pesquise aqui"/>
        <a className={styles.searchBtn} href="#ff">
          <i className={styles.searchBtn}>
            <FaSearch/>
          </i>
        </a>
      </div>


      <div className={styles.userLogin}>
        <a href="ldjsadjfws"><FaRegUser/></a>
        <a href="ldjsadjfws"><FaRegHeart/></a>
        <a href="ldjsadjfws"><FiShoppingCart/></a>
      </div>

    </header>
  )
}