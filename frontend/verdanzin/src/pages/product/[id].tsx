import { useEffect, useState } from 'react';
import Image from 'next/image';
import { api } from '@/utils/api';
import { Product } from '@/types/Product';
import { Container, ContainerInput, ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product';
import { GetStaticPaths, GetStaticProps } from 'next';
import { formatCurrency } from '@/utils/formatCurrency';
import { CaretUpIcon } from '@radix-ui/react-icons';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { Footer } from '@/components/Footer';
import NavBar from '@/components/NavBar/NavBar';
import { useAuth } from '@/auth/authContex';
import { User } from '@/types/User';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


interface ProductProps {
  product: Product;
}

export default function ProductPage({ product }: ProductProps) {
  const [inputQuantity, setInputQuantity] = useState<number>(1);
  const { state } = useAuth();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/users');
        const allUsers: User[] = response.data;

        const foundUser = allUsers.find(u => u.email === state.user);

        if (foundUser) {
          setUser(foundUser);
        } else {
          console.log(`Usuário com o email ${state.user} não encontrado.`);
        }
      } catch (error) {
        console.error(`Erro ao buscar os usuários: ${error}`);
      }
    };

    fetchUserData();
  }, [state.user]);

  useEffect(() => {
    if (!product) {
      alert('Produto não encontrado');
    }
  }, [product]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Você precisa efetuar o login antes de comprar ou adcionar um produto ao carrinho');
      router.push('/Login');
    } else {
      try {
        await api.post('/purchaseItems', {
          productId: product._id,
          userId: user._id
        });

        toast.success('Produto adcionado com sucesso!');
      } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
      }
    }
  };

  const handdleBuyProduct = async () => {
    if (!user) {
      toast.error('Você precisa efetuar o login antes de comprar ou adcionar um produto ao carrinho');
      router.push('/Login');
    } else {
      try {
        await api.post('/purchaseItems', {
          productId: product._id,
          userId: user._id
        });
        router.push('/Cart');
        toast.success('Você esta sendo redirecionado para a páina do carrinho!');
      } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
      }
    }
  };

  const handleAddQuantity = () => {
    setInputQuantity(inputQuantity + 1 );

    if (inputQuantity > (product.quantity - 1)) {
      alert('not');
    }
  };

  const handleRemoveQuantity = () => {
    setInputQuantity(inputQuantity - 1);

    if (inputQuantity < 1 ) {
      alert('not');
    }
  };

  return (
    <>
      <NavBar/>

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
            <ContainerInput>
              <div>
                <h2>
                  Quantidade: {inputQuantity}
                </h2>
                <div>
                  <CaretUpIcon  onClick={handleAddQuantity}  color='#121214'/>
                  <CaretDownIcon onClick={handleRemoveQuantity} color='#121214'/>
                </div>
              </div>
              <h3>{product.quantity ? 'Em estoque' : 'Sem estoque'}: {product.quantity}</h3>
            </ContainerInput>
            <div>
              <button
                disabled={product.quantity > 0 ? false : true}
                onClick={handleAddToCart}
              >
                Adcionar ao carrinho
              </button>

              <button onClick={handdleBuyProduct}>
                Comprar agora
              </button>
            </div>
          </ProductDetails>
        </ProductContainer>
      </Container>

      <Footer/>
    </>
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
      _id: productData._id || null,
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
