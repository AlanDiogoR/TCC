import LOGO  from '@/assets/logo/verdan_logo.png';
import { NavCategories, NavIcons, NavSearch, Research } from '@/styles/pages/home';
import { FaSortDown, FaHeart, FaSearch, FaRegUser } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <NavSearch>

        <Image
          src={LOGO}
          width={160}
          height={80}
          alt=''
        />

        <Research>

          <button>
            Todos
            <FaSortDown/>
          </button>
          <input type="text"  placeholder="Pesquise aqui"/>
          <button>
            <FaSearch/>
          </button>

        </Research>

        <NavIcons>
          <a href=""><FaRegUser/></a>
          <a href=""><FaHeart/></a>
          <a href=""><FiShoppingCart/></a>
        </NavIcons>

      </NavSearch>

      <NavCategories>
        <ul>
          <li>Eletronico</li>
          <li>Pet</li>
          <li>Bonecas</li>
          <li>Brinquedos</li>
          <li>Utilidades</li>
          <li>Jardinagem</li>
        </ul>
      </NavCategories>
    </>
  );
}

