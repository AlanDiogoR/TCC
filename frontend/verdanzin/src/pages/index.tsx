import LOGO  from '@/assets/logo/verdan_logo.png';
import { NavCategories, NavSearch } from '@/styles/pages/home';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <NavSearch>
        <Image
          src={LOGO}
          width={520}
          height={480}
          alt=''
        />
      </NavSearch>

      <NavCategories>
        Boneca
      </NavCategories>
    </>
  );
}

