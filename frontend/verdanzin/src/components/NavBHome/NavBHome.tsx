import logo  from '@/assets/logo/verdan_logo.png';
import casa  from '@/assets/logo/casa.png';
import { NavIcons, NavSearch, Research, IconSearch, MenuHamburguer, MenuItem, ListHamburguer, ButtonHome } from '@/styles/pages/NavBar';
import { FaHeart, FaSearch, FaRegUser } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function NavBHome() {
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

        <Link href={'/'}>
          <Image
            src={logo}
            width={160}
            height={80}
            alt=''
          />
        </Link>


        <Research>
          <Link href={'/'}>
            <ButtonHome>
              <Image
                src={casa}
                width={25}
                height={25}
                alt=''
              />
            </ButtonHome>
          </Link>

          <input type="text"  placeholder="Pesquise aqui"/>
          <IconSearch>
            <FaSearch/>
          </IconSearch>

        </Research>

        <NavIcons>

          <Link href={'../Login'}>
            <FaRegUser/>
          </Link>
          <Link href={'../Favorite'}>
            <FaHeart/>
          </Link>

          <Link href={'../Cart'}>
            <FiShoppingCart/>
          </Link>
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
            </ListHamburguer>
          )}
        </MenuHamburguer>

      </NavSearch>
    </>
  );
}

