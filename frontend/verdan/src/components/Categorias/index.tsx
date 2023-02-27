import styles from './styles.module.scss';

export function Categorias() {
  return (
    <nav className={styles.categorias}>
      <ul>
        <li className={styles.hRow}><a href="#aaa">Esportes</a></li>
        <li className={styles.hRow}><a href="#aaa">Jogos</a></li>
        <li className={styles.hRow}><a href="#aaa">Utilidades</a></li>
        <li className={styles.hRow}><a href="#aaa">Higiene</a></li>
        <li className={styles.hRow}><a href="#aaa">Beleza</a></li>
        <li className={styles.hRow}><a href="#aaa">Informe seu CEP</a></li>
      </ul>

      <ul>
        <li className={styles.hRow}><a href="#jjjj">Crie sua conta</a></li>
        <li><a href="#dgdgd">Entre</a></li>
        <li>oi</li>
      </ul>
    </nav>
  )
}