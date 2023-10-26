import { ContainerCart, ContainerCarts, ProductDetailsCart } from './cart';
import NavBHome from '@/components/NavBHome/NavBHome';
import { Footer } from '@/components/Footer';

export default function Cart() {
  return (
    <>
      <NavBHome/>

      <ContainerCart>
        <h1>Carrinho de compras</h1>

        <ContainerCarts>

          <ProductDetailsCart>
            <p>Nome do produto</p>
            <p>price</p>
            <p>total</p>
          </ProductDetailsCart>

          <div>
            <p>imagem</p>
          </div>
        </ContainerCarts>
      </ContainerCart>

      <Footer/>

    </>
  );
}
