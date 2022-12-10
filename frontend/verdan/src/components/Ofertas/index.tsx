import styles from "./styles.module.scss";
import { Produtos } from "../Produtos";

export function Ofertas() {
  return (
    <main className={styles.ofertasDaSemana}>
      <h2>Ofertas da semana</h2>

      <div className={styles.slider}>
        <div><Produtos/></div>
        <div><Produtos/></div>
        <div><Produtos/></div>
      </div>
      {/* <div className={styles.bannerProduto}>
        <div className={styles.icon}>&lt;</div> sinal de menor 
        <div>
        
          <div className={styles.produtos}>
            <div className={styles.produto}><Produtos/></div>
            <div className={styles.produto}><Produtos/></div>
            <div className={styles.produto}><Produtos/></div>
          </div>
        </div>
        <div className={styles.icon}>&gt;</div>sinal de maior 
      </div>
       */}
    </main>
  )
}