import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { api } from '@/utils/api';
import { Product } from '@/types/Product';
import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface ProductProps {
  product?: Product;
}

interface Params {
  id: string;
}

export default function ProductPage({ product }: ProductProps) {
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={`/uploads/${product.imagePath}`} width={520} height={480} alt='' />
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


export async function getServerSideProps(context: GetServerSidePropsContext<ParsedUrlQuery>): Promise<{ props: ProductProps }> {
  const { id } = context.params || {};

  if (!id) {
    return {
      notFound: true,
    };
  }

  try {
    const response = await api.get(`/products/${id}`);
    const product = response.data;

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Erro ao buscar o produto:', error);

    return {
      notFound: true,
    };
  }
}














/*import { useEffect, useState } from 'react';
import Image from 'next/image';
import { api } from '@/utils/api';
import { Product } from '@/types/Product';
import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product';


interface ProductProps {
  id: string;
}

export default function Products({ id }: ProductProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProducts([response.data]);
      } catch (error) {
        console.error('Erro ao buscar o produto:', error);
      }
    };

    fetchData();
  }, [id]);



  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={`/uploads/${products.imagePath}`} width={520} height={480} alt='' />
      </ImageContainer>

      <ProductDetails>
        <h1>{products.name}</h1>
        <span>{products.price}</span>
        <p>{products.description}</p>

        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  );
}
*/
