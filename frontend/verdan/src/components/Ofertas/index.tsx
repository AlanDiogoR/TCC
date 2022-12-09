import styles from "./styles.module.scss";
import boneca from '../../assets/images/b1.jpg';
import { Produtos } from "../Produtos";

export function Ofertas() {
  return (
    <main className={styles.ofertasDaSemana}>
      <h2>Ofertas da semana</h2>
      <div>
      <div className={styles.icon}>&lt;</div> {/*sinal de menor */}
      <div className={styles.produtos}>
        <Produtos/>
        <Produtos/>
        <Produtos/>
      </div>
      <div className={styles.icon}>&gt;</div>{/*sinal de maior */}
      
      </div>
    </main>
  )
}