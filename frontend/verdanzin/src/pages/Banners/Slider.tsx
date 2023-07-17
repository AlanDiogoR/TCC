import { SliderContainer } from '@/styles/pages/slider';
import Image from 'next/legacy/image';
import briquedos from '@/assets/baners/Utilidades domesticas.png';
import pet from '@/assets/baners/pet.png';
import eletronicos from '@/assets/baners/eletrônicos.png';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

const sliderImages = [briquedos, pet, eletronicos];

export function Slider() {
  const [sliderRef] = useKeenSlider({
    slides: sliderImages.length,
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
