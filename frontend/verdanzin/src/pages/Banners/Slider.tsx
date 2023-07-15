import { SliderContainer } from '@/styles/pages/slider';

import Image from 'next/legacy/image';
import briquedos  from '@/assets/baners/Utilidades domesticas.png';
import pet  from '@/assets/baners/pet.png';
import eletronicos  from '@/assets/baners/eletrônicos.png';



export function Slider() {

  return (
    <SliderContainer>
      <Image
        src={briquedos}
        alt=''
        layout="responsive"
      />

    </SliderContainer>
  );
}
