import { useState } from 'react';

import logo  from '@/assets/logo/verdan_logo.png';
import { NavIcons, NavSearch, Research, IconSearch, ButtonAll, MenuHamburguer, MenuItem, ListHamburguer } from '@/styles/pages/NavBar';
import { FaHeart, FaSearch, FaRegUser } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import Image from 'next/image';
import { Category } from '@/types/Category';

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

        <Image
          src={logo}
          width={160}
          height={80}
          alt=''
        />

        <Research>

          <ButtonAll>
            {categories.map(categorie => {
              return (
                <option key={categorie._id}>{categorie.name}</option>
              );
            })}
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

