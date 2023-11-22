import { useEffect } from 'react';
import Image from 'next/image';
import { api } from '@/utils/api';
import { Product } from '@/types/Product';
import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product';
import { GetStaticPaths, GetStaticProps } from 'next';

interface ProductProps {
  product: Product;
}

export default function ProductPage({ product }: ProductProps) {
  useEffect(() => {
    if (!product) {
      alert('produto não encontrado');
    }
  }, [product]);

  return (
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
        <span>{product.price}</span>
        <p>{product.description}</p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
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
      _id: productData.id,
      name: productData.name,
      imagePath: productData.imagePath,
      price: productData.price,
      description: productData.description,
      details: productData.details,
    };

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.log(`Error fetching product: ${error}`);
    return {
      notFound: true,
    };
  }
};
