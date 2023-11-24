import { useEffect, useState } from 'react';
import Image from 'next/image';
import { api } from '@/utils/api';
import { Product } from '@/types/Product';
import { Container, ContainerInput, ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product';
import { GetStaticPaths, GetStaticProps } from 'next';
import { formatCurrency } from '@/utils/formatCurrency';
import { CartItem } from '@/types/CartItem';
import { number } from 'zod';

interface ProductProps {
  product: Product;
}

export default function ProductPage({ product }: ProductProps) {
  const [ cartItems, setCartItems] = useState<CartItem[]>([]);
  const [inputQuantity, setInputQuantity] = useState<number>(1);

  useEffect(() => {
    if (!product) {
      alert('Produto não encontrado');
    }
  }, [product]);

  const handleAddToCart = () => {

    // Adiciona ao carrinho
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];
      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };
      alert('Produto adicionado ao carrinho!');
      return newCartItems;
    });
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10) || 0;
    setInputQuantity(newQuantity);
  };

  return (
    <Container>
      <ProductContainer>
        <ImageContainer>
          <Image
            src={`/uploads/${product.imagePath}`}
            width={520}
            height={480}
            alt={`${product.name}`}
          />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{formatCurrency(product.price)}</span>
          <h2>Descrição:</h2>
          <p>{product.description}</p>
          <h2>Detalhes:</h2>
          <p>{product.details}</p>
          <h2>Quantidade:</h2>
          <ContainerInput
            type='number'
            value={inputQuantity}
            onChange={handleQuantityChange}
            disabled={inputQuantity > (product.quantity - 1)}
          />
          <h3>{product.quantity ? 'Em estoque' : 'Sem estoque'}</h3>

          <div>
            <button
              disabled={product.quantity > 0 ? false : true}
              onClick={handleAddToCart}
            >
              Adcionar ao carrinho
            </button>
            <button>Comprar agora</button>
          </div>
        </ProductDetails>
      </ProductContainer>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = String(params?.id);

  try {
    const response = await api.get(`/products/${productId}`);
    const productData = response.data;

    const product: Product = {
      _id: productData._id || null, // Utiliza null se _id for undefined
      name: productData.name,
      imagePath: productData.imagePath,
      price: productData.price,
      description: productData.description,
      details: productData.details,
      quantity: productData.quantity,
    };

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.log(`Erro ao buscar o produto: ${error}`);
    return {
      notFound: true,
    };
  }
};
