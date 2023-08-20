import { FavoriteContainer, ProductDetailsHeart } from './favorie';
import { FaHeart } from 'react-icons/fa';


export default function Favorite() {
  return (
    <>
      <FavoriteContainer>
        <h1>Meus favoritos</h1>

        <div>

          <ProductDetailsHeart>
            <p>Nome do produto</p>
            <p>preço</p>
            <FaHeart/>
          </ProductDetailsHeart>

          <div>
            <img src="tss" alt="Imagem produto(vem do banco quando eu arrumar" />
          </div>
        </div>

      </FavoriteContainer>
    </>
  );
}
