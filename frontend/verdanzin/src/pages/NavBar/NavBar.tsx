import { useState } from 'react';

import logo  from '@/assets/logo/verdan_logo.png';
import { NavIcons, NavSearch, Research, IconSearch, ButtonAll, MenuHamburguer, MenuItem, ListHamburguer } from '@/styles/pages/NavBar';
import { FaHeart, FaSearch, FaRegUser } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import Image from 'next/image';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
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
            <option value="">Todos</option>
            <option value="">Eletrônicos</option>
            <option value="">Pets</option>
            <option value="">Bonecas</option>
            <option value="">Brinquedos</option>
            <option value="">Utilidades</option>
            <option value="">Jardinagem</option>
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
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>

          {isOpen && (
            <ListHamburguer>
              <MenuItem onClick={handleItemClick}>
                <section>

                </section>
              </MenuItem>
              <ul>
                <MenuItem onClick={handleItemClick}>Eletrônicos</MenuItem>
                <MenuItem onClick={handleItemClick}>Pets</MenuItem>
                <MenuItem onClick={handleItemClick}>Bonecas</MenuItem>
                <MenuItem onClick={handleItemClick}>Brinquedos</MenuItem>
                <MenuItem onClick={handleItemClick}>Utilidades</MenuItem>
                <MenuItem onClick={handleItemClick}>Jardinagem</MenuItem>
                <MenuItem onClick={handleItemClick}>Sair</MenuItem>
              </ul>
            </ListHamburguer>
          )}
        </MenuHamburguer>

      </NavSearch>
    </>
  );
}

