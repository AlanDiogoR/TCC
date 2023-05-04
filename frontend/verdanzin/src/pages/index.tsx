import LOGO  from '@/assets/logo/verdan_logo.png';
import { NavCategories, NavIcons, NavSearch, Research } from '@/styles/pages/home';
import { FaShoppingBag, FaHeart } from 'react-icons/fa';
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
          pesquise aqui
        </Research>
        
        <NavIcons>
          <FaHeart/>
        </NavIcons>

      </NavSearch>

      <NavCategories>
        Boneca
      </NavCategories>
    </>
  );
}

