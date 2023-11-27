import {  useEffect, useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import ProductSlider from './ProductSlider';

import { api } from '@/utils/api';
import { Category } from '@/types/Category';
import { Product } from '@/types/Product';
import { CenteredContainer } from '@/styles/pages/app';
import { Footer } from '@/components/Footer';


export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [ isLoading, setIsLoading] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts ] = useState(false);
  const categoryId = '';


  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products'),
    ]).then(([categoriesResponse, productsResponse]) => {  //(
      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
    });
  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId
      ? '/products'
      : `/categories/${categoryId}/products`;

    setIsLoadingProducts(true);

    const { data } = await api.get(route);
    setProducts(data);
    setIsLoadingProducts(false);
  }

  return (
    <>

      {isLoading ? (
        <CenteredContainer>
          não funcionou
        </CenteredContainer>
      ) : (
        <>
          <NavBar
            categories={categories}
            onSelectCategory={handleSelectCategory}
            categoryId={categoryId}
          />



          {isLoadingProducts ? (
            <CenteredContainer>
              teste product
            </CenteredContainer>
          ) : (
            <>
              {products.length > 0 ? (
                <ProductSlider
                  products={products}
                />
              ) : (
                <p>não funcionou</p>
              )}
            </>
          )}

          <Footer/>
        </>
      )}

    </>
  );
}
