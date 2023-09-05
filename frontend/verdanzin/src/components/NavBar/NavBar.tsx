import { useState } from 'react';

import logo  from '@/assets/logo/verdan_logo.png';
import { NavIcons, NavSearch, Research, IconSearch, ButtonAll, MenuHamburguer, MenuItem, ListHamburguer } from '@/styles/pages/NavBar';
import { FaHeart, FaSearch, FaRegUser } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import Image from 'next/image';
import { Category } from '@/types/Category';
import Link from 'next/link';


interface CategoriesProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => Promise<void>;
}

export default function NavBar({ categories, onSelectCategory }:CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  function handleSelectCategory( categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;
    onSelectCategory(category);
    setSelectedCategory(category);
  }

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

          {/*<ButtonAll>
            {categories.map(categorie => {
              return (
                <option key={categorie._id}>{categorie.name}</option>
              );
            })}
          </ButtonAll>*/}
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
              <ul>
                {categories.map(categorie => {
                  return (
                    <MenuItem onClick={handleItemClick} key={categorie._id}>{categorie.name}</MenuItem>
                  );
                })}
              </ul>
            </ListHamburguer>
          )}
        </MenuHamburguer>

      </NavSearch>
    </>
  );
}

