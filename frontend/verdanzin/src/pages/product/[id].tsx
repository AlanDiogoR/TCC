import Image from 'next/image';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ProductContainer, ImageContainer, ProductDetails } from '../../styles/pages/Product';
import { api } from '@/utils/api';
import { Product } from '@/types/Product';

interface ProductProps {
  product: Product;
}

interface Params {
  id: string;
}

export default function Products({ product }: ProductProps) {
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={`/uploads/${product.imagePath}`} width={520} height={480} alt='' />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>

        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  );
}

/*

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: [], // Precisa ser preenchido com os IDs dos produtos disponíveis
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<ProductProps, Params> = async ({ params }) => {
  const productId = String(params?.id);

  try {
    const response = await api.get(`/products/${productId}`);
    const product = response.data;

    return {
      props: {
        product,
      },
      revalidate: 60 * 60 * 1,
    };
  } catch (error) {
    console.error('Erro ao buscar o produto:', error);

    return {
      notFound: true,
    };
  }
};


/*import Image from 'next/image';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ProductContainer, ImageContainer, ProductDetails } from '../../styles/pages/Product';
import { api } from '@/utils/api';
import { Product } from '@/types/Product';

interface ProductProps {
  product: Product;
}

interface Params {
  id: string;
}

export default function Product({ product }: ProductProps) {
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={`/uploads/${product.imagePath}`} width={520} height={480} alt='' />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>

        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  );
}
/*


export const getStaticProps: GetStaticProps<ProductProps> = async ({ params }) => {
  const productId = String(params?.id);

  try {
    const response = await api.get('/products');

    const product = response.data;

    return {
      props: {
        product,
      },
      revalidate: 60 * 60 * 1,
    };
  } catch (error) {
    console.error('Erro ao buscar o produto:', error);

    return {
      notFound: true,
    };
  }
};


/*
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = String(params.id);

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1,
  };
};
/*


export const getStaticProps: GetStaticProps<ProductProps, Params> = async ({ params }) => {
  const productId = params?.id || '';

  const product: ProductProps['product'] = {
    id: productId,
    name: product.name,
    imageUrl: 'URL da Imagem',
    price: 'Preço',
    description: 'Descrição do Produto',
    defaultPriceId: 'ID do Preço Padrão',
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 1,
  };
};






















/*import { GetStaticPaths, GetStaticProps } from 'next';
import axios from 'axios';
import Image from 'next/image';

import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/Product';
import { useState } from 'react';

interface ProducProps {
  product: {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
    description: string,
    defaultPriceId: string,
  }
}

export default function Product( { product }:ProducProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;

    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert('Falha ao redirecionar ao checkout');

    }
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image
          src={product.imageUrl}
          width={520}
          height={480}
          alt=''
        />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>

        <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
          Comprar agora
        </button>
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
  const productId = String(params.id);

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1,
  };
};
*/
