import { Produtos } from "../Produtos";
import styles from './style.module.scss';

export function Container() {
  return (
    <div className={styles.ContainerProdutos}>
      <Produtos/>
      <Produtos/>
      <Produtos/>
      <Produtos/>
      <Produtos/>
      <Produtos/>
      <Produtos/>
      <Produtos/>
      <Produtos/>
      <Produtos/>
      <Produtos/>
    </div>
  );
}