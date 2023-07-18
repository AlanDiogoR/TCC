import Image from 'next/image';

import { useKeenSlider } from 'keen-slider/react';

import 'keen-slider/keen-slider.min.css';
import Link from 'next/link';
import { HomeContainer, ProductSLider } from '@/styles/pages/ProductSlider';

import { Product } from '@/types/Product';

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
    <HomeContainer ref={sliderRef} className='keen-slider'>
      <h1>Ofertas da semana</h1>
      {products.map(product => {
        return (
          <Link key={product._id} href={'SDLSD'} prefetch={true}>
            <ProductSLider className='keen-slider__slide' >
              <Image src={product.imagePath} width={520} height={480} alt='' />

              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </ProductSLider>
          </Link>
        );
      })}
    </HomeContainer>
  );
}

