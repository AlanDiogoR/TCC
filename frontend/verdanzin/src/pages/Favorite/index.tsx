import { FavoriteContainer, ProductContainer, ProductDetailsHeart } from './favorie';
import { FaHeart } from 'react-icons/fa';
import NavBHome from '@/components/NavBHome/NavBHome';
import { Footer } from '@/components/Footer';


export default function Favorite() {
  return (
    <>
      <NavBHome/>

      <FavoriteContainer>
        <h1>Meus favoritos</h1>

        <ProductContainer>

          <ProductDetailsHeart>
            <p>Nome do produto</p>
            <p>preço</p>
            <FaHeart/>
          </ProductDetailsHeart>

          <div>
            <img src="tss" alt="Imagem produto(vem do banco quando eu arrumar" />
          </div>
        </ProductContainer>

      </FavoriteContainer>

      <Footer/>
    </>
  );
}
