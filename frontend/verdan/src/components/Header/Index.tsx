import logo from '../../assets/images/logoVerdan.webp';
import { FaSearch } from 'react-icons/fa';

import { FaShoppingBag, FaHeart, FaUserAlt, FaRegUser, FaRegHeart} from 'react-icons/fa';

import { FiShoppingCart } from 'react-icons/fi'


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
        {/*<a href="ldjsadjfws"><FaUserAlt/></a>
        <a href="#js" id={styles.heart}><FaHeart/></a>
        <a href="#jjj"><FaShoppingBag/></a>*/}
        <a href="ldjsadjfws"><FaRegUser/></a>
        <a href="ldjsadjfws"><FaRegHeart/></a>
        <a href="ldjsadjfws"><FiShoppingCart/></a>
      </div>

    </header>
  )
}