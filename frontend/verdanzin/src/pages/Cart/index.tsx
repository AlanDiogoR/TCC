import { ContainerCart, ProductDetailsCart } from './cart';

export default function Cart() {
  return (
    <ContainerCart>
      <h1>Carrinho de compras</h1>

      <div>

        <ProductDetailsCart>
          <p>Nome do produto</p>
          <p>price</p>
          <p>total</p>
        </ProductDetailsCart>

        <div>
          <p>imagem</p>
        </div>
      </div>
    </ContainerCart>
  );
}
