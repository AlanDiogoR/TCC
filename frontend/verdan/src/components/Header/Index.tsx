import logo from '../../assets/images/logoVerdan.webp';
import { FaSearch } from 'react-icons/fa';

export function Header() {
  return(
    <header>
      <div>
        <img src={logo} alt="Logo verdan Shopping" />
      </div>

      <nav>
         <ul>
          <li><a href='#fw'>Produtos</a></li>
          <li><a href='#op'>Localização</a></li>
          <li><a href='jjh'>Avaliação</a></li>
          <li><a href='madioca'>Contatos</a></li>
          <li><a href="#madioca">Login</a></li>
          </ul>
       </nav>

      <div>
        <input type="search" placeholder='Pesquise aqui'/>
        <button><FaSearch/></button>
      </div>

    </header>
  )
}