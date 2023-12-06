import { useState } from 'react';
import Image from 'next/image';
import { FaHeart, FaSearch, FaRegUser } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';
import { api } from '@/utils/api';
import { Product } from '@/types/Product';
import { useAuth } from '@/auth/authContex';
import { NavIcons, NavSearch, Research, IconSearch, ButtonAll, MenuHamburguer, MenuItem, ListHamburguer, ButtonHome } from '@/styles/pages/NavBar';
import { Slider } from '@/pages/Banners/Slider';
import casa from '@/assets/logo/casa.png';
import logo from '@/assets/logo/verdan_logo_org.png';
import { Category } from '@/types/Category';
import { toast } from 'react-toastify';
import ProductSlider from '@/pages/ProductSlider';

interface CategoriesProps {
  categories?: Category[];
  onSelectCategory?: (categoryId: string) => Promise<void>;
  categoryId?: string;
}

export default function NavBar({ categories, onSelectCategory }: CategoriesProps) {
  const { state } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  const filterProductsBySearchTerm = (term: string) => {
    // Filtra os produtos apenas se uma categoria estiver selecionada
    if (selectedCategory) {
      const filteredProducts = products.filter((product: Product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filteredProducts);
    }
  };

  const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = event.target.value;
    if (onSelectCategory) {
      onSelectCategory(selectedCategoryId ?? '6541a3bed7de0e00c7c7986a');
    }

    const route = !selectedCategoryId
      ? '/products'
      : `/categories/${selectedCategoryId}/products`;

    const { data } = await api.get(route);
    setProducts(data);
    setSelectedCategory(selectedCategoryId);
    setFilteredProducts(data); // Inicializa os produtos filtrados com os produtos totais
  };



  const handleSearch = () => {
    // Utiliza a função auxiliar para filtrar os produtos de acordo com a categoria selecionada
    filterProductsBySearchTerm(searchTerm);
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
          {categories?.length ? (
            <ButtonAll onChange={handleSelectChange}>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </ButtonAll>
          ) : (
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
          )}
          <input
            type="text"
            placeholder="Pesquise aqui"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconSearch onClick={handleSearch}>
            <FaSearch />
          </IconSearch>
        </Research>

        <NavIcons>
          {state.user == null ? (
            <Link href="../Login">
              <FaRegUser />
            </Link>
          ) : (
            <Link href="../YourAccount">
              <FaRegUser />
            </Link>
          )}

          {state.user == null ? (
            <Link href={'../Login'} onClick={() => (toast.error('Você precisa fazer login para adicionar ao carrinho!'))}>
              <FiShoppingCart />
            </Link>
          ) : (
            <Link href={'../Cart'}>
              <FiShoppingCart />
            </Link>
          )}
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
                {categories?.map(category => (
                  <MenuItem onClick={handleItemClick} key={category._id}>{category.name}</MenuItem>
                ))}
              </ul>
            </ListHamburguer>
          )}
        </MenuHamburguer>
      </NavSearch>

      {categories && categories.length > 0 && !selectedCategory && (
        <Slider />
      )}

      {filteredProducts && filteredProducts.length > 0 && (

        <ProductSlider
          products={filteredProducts}
        />
      )}
    </>
  );
}
