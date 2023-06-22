import { useState } from 'react';

import logo  from '@/assets/logo/verdan_logo.png';
import { NavIcons, NavSearch, Research, IconSearch, ButtonAll, MenuHamburguer } from '@/styles/pages/home';
import { FaSortDown, FaHeart, FaSearch, FaRegUser } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import Image from 'next/image';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <NavSearch>

        <Image
          src={logo}
          width={160}
          height={80}
          alt=''
        />

        <Research>

          <ButtonAll>
            Todos
            <FaSortDown/>
          </ButtonAll>
          <input type="text"  placeholder="Pesquise aqui"/>
          <IconSearch>
            <FaSearch/>
          </IconSearch>

        </Research>

        <NavIcons>
          <a href=""><FaRegUser/></a>
          <a href=""><FaHeart/></a>
          <a href=""><FiShoppingCart/></a>
        </NavIcons>

        <MenuHamburguer className={isOpen ? 'open' : ''} onClick={handleClick}>
          <span></span>
          <span></span>
          <span></span>
        </MenuHamburguer>

      </NavSearch>
    </>
  );
}

