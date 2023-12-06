import Image from 'next/image';

import { useKeenSlider } from 'keen-slider/react';

import 'keen-slider/keen-slider.min.css';
import Link from 'next/link';
import { HomeContainer, MainContainer, ProductSLider } from '@/styles/pages/ProductSlider';

import { Product } from '@/types/Product';
import { GetStaticProps } from 'next';
import { formatCurrency } from '@/utils/formatCurrency';

interface MenuProps {
  products: Product[];
}

export default function ProductSlider({ products }:MenuProps) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 52,
    }
  });

  return (
    <>
      <MainContainer>

        <HomeContainer ref={sliderRef} className='keen-slider'>
          {products.map(product => {
            return (
              <Link key={product._id} href={`/product/${product._id}`} prefetch={false}>
                <ProductSLider className='keen-slider__slide' >
                  <Image src={`/uploads/${product.imagePath}`} width={320} height={280} alt={product.name} />



                  <footer>
                    <strong>{product.name}</strong>
                    <span>{formatCurrency(product.price)}</span>
                  </footer>
                </ProductSLider>
              </Link>
            );
          })}
        </HomeContainer>
      </MainContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('/api/products');
  const productsData = await response.json();
  const products = productsData.map((product: Product) => {
    return {
      _id: product._id,
      name: product.name,
      imagePath: product.imagePath,
      price: product.price,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
