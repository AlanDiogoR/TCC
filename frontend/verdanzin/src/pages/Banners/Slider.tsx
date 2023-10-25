import { SliderContainer } from '@/styles/pages/Slider';
import Image from 'next/legacy/image';
import briquedos from '@/assets/banners/brinquedos_banner1.png';
import pet from '@/assets/banners/pet_banner.png';
import eletronicos from '@/assets/banners/eletronicos_banner.png';
import utilidades from '@/assets/banners/Utilidades_domesticas_banner.png';
import jardinagem from '@/assets/banners/jardinagem_banner.png';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useEffect } from 'react';

const sliderImages = [briquedos, pet, eletronicos, utilidades, jardinagem];


export function Slider() {
  const [sliderRef, slider] = useKeenSlider({
    slides: sliderImages.length,
    loop: true,
  });

  const autoAdvance = () => {
    if (slider) {
      slider.current?.next();
    }
  };

  useEffect(() => {
    const interval = setInterval(autoAdvance, 2500);


    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <SliderContainer ref={sliderRef} className='keen-slider'>
      {sliderImages.map((imagem, index) => (
        <div key={index} className='keen-slider__slide'>
          <Image src={imagem} width={520} height={220} alt='' layout='responsive' />
        </div>
      ))}
    </SliderContainer>
  );
}
/*export function Slider() {
  const [sliderRef] = useKeenSlider({
    slides: sliderImages.length,
    loop: true,

  });

  return (
    <SliderContainer ref={sliderRef} className='keen-slider'>
      {sliderImages.map((imagem, index) => (
        <div key={index} className='keen-slider__slide'>
          <Image src={imagem} width={520} height={220} alt='' layout='responsive' />
        </div>
      ))}
    </SliderContainer>
  );
}
*/
