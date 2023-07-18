import { useEffect, useState } from 'react';
import { Slider } from './Banners/Slider';
import NavBar from './NavBar/NavBar';
import ProductSlider from './ProductSlider/Products';

import { api } from '@/utils/api';
import { Category } from '@/types/Category';
import { Product } from '@/types/Product';


export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products'),
    ]).then(([categoriesResponse, productsResponse]) => {  //(
      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
    });
  }, []);

  return (
    <>
      <NavBar/>
      <Slider/>

      <>
        {products.length > 0 ? (
          <ProductSlider
            products={products}
          />
        ) : (
          <p>não funcionou</p>
        )}
      </>

    </>
  );
}
