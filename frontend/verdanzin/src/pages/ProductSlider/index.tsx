import Image from 'next/image';

import { useKeenSlider } from 'keen-slider/react';

import 'keen-slider/keen-slider.min.css';
import Link from 'next/link';
import { HomeContainer, MainContainer, ProductSLider } from '@/styles/pages/ProductSlider';

import { Product } from '@/types/Product';
import { GetStaticProps } from 'next';

interface MenuProps {
  products: Product[];
}

export default function ProductSlider({ products }:MenuProps) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  });

  return (
    <>
      <MainContainer>
        <h1>Ofertas da semana </h1>

        <HomeContainer ref={sliderRef} className='keen-slider'>
          {products.map(product => {
            return (
              <Link key={product._id} href={`/product/${product._id}`} prefetch={false}>
                <ProductSLider className='keen-slider__slide' >
                  <Image src={`/uploads/${product.imagePath}`} width={520} height={480} alt={product.name} />



                  <footer>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
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

export const getStaticProps: GetStaticProps  = async () => {

  const goiaba = products.map(product => {
    return {
      id: product._id,
      name: product.name,
      imageUrl: product.imagePath,
      price: product.price,
    };
  });

  return {
    props: {
      goiaba,
    },
    revalidate: 60 * 60 * 2,
  };
};

