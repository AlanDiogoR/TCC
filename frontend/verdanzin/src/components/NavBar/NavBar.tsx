import { useState } from 'react';

import logo  from '@/assets/logo/verdan_logo_org.png';
import { NavIcons, NavSearch, Research, IconSearch, ButtonAll, MenuHamburguer, MenuItem, ListHamburguer } from '@/styles/pages/NavBar';
import { FaHeart, FaSearch, FaRegUser } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import Image from 'next/image';
import { Category } from '@/types/Category';
import Link from 'next/link';
import { api } from '@/utils/api';
import { Product } from '@/types/Product';
import { Slider } from '@/pages/Banners/Slider';


interface CategoriesProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => Promise<void>;
}

export default function NavBar({ categories, onSelectCategory }:CategoriesProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    onSelectCategory(categoryId);

    const route = !categoryId
      ? '/products'
      : `/categories/${categoryId}/products`
    ;
    const { data } = await api.get(route);
    setProducts(data);
    setSelectedCategory(categoryId);

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

          <ButtonAll onChange={handleSelectChange} defaultValue="">
            {categories.map(categorie => {
              return (
                <option key={categorie._id} value={categorie._id}>{categorie.name}</option>
              );
            })}
          </ButtonAll>
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

      {selectedCategory ? (
        null
      ) : (
        <Slider/>
      )}
    </>
  );
}
