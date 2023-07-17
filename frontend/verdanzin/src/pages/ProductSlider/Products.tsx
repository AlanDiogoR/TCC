import Image from 'next/image';

import { useKeenSlider } from 'keen-slider/react';


import 'keen-slider/keen-slider.min.css';
import Link from 'next/link';
import { HomeContainer, Product } from '@/styles/pages/ProductSlider';

import logo  from '@/assets/logo/verdan_logo.png';


export default function ProductSlider() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  });

  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
      return (
        <Link key={'fsmkljf'} href={'sfmsk'} prefetch={false}>
          <Product className='keen-slider__slide' >
            <Image src={logo} width={520} height={480} alt='' />

            <footer>
              <strong>La ele mo=ço</strong>
              <span>vai pagar mesmo</span>
            </footer>
          </Product>
        </Link>
      );

    </HomeContainer>
  );
}
