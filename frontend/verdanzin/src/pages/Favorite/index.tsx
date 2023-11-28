import { FavoriteContainer, ProductContainer, ProductDetailsHeart } from './favorie';
import { FaHeart } from 'react-icons/fa';
import { Footer } from '@/components/Footer';
import NavBar from '@/components/NavBar/NavBar';


export default function Favorite() {
  return (
    <>
      <NavBar/>

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
