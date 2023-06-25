import styles from './styles.module.scss'
import boneca from '../../assets/images/b1.jpg';
import { FiHeart } from 'react-icons/fi';


export function Produtos() {
  return (
    <div className={styles.produto}>
      <div>
        <img src={boneca} alt="iamgem produto" />
      </div>

      <hr className='styeles.sla' />
      <div>
        <h3 id={styles.hr}>Boneca</h3>
      </div>

      <div className={styles.footer}>
        <div className={styles.price}>
          <label>R$80,80</label>
        </div>

        <div className={styles.heart}>
          <button><FiHeart/></button>
        </div>
      </div>
    </div>
    
  );
}