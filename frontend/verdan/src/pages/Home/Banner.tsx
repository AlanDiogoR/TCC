import b1 from '../../assets/images/B2.jpg';
import B2 from '../../assets/images/B3.jpg';
import B3 from '../../assets/images/B4.jpg';

import styles from './Banner.module.scss';

export function Banner() {
  return (
    <div className={styles.slider}>
      <img src={B3} alt="imagem do banner" />
    </div>
  );
}

