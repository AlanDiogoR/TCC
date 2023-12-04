import NavBar from '@/components/NavBar/NavBar';
import { ContainerCart, ContainerCartT, ContainerCarts, ContainerInput, DetailsInformation, Infomrations, Main, NameProduct, Nothing, ProductDetailsCart, ProductImg, Titulo } from './cart';
import { Footer } from '@/components/Footer';
import { useEffect, useState } from 'react';
import { User } from '@/types/User';
import { api } from '@/utils/api';
import { useAuth } from '@/auth/authContex';
import { PurchaseItems } from '@/types/PurchaseItems';
import { Product } from '@/types/Product';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons';
import { json } from 'stream/consumers';



export default function Cart() {
  const [user, setUser] = useState<User | null>(null);
  const { state } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [reinderizar, setReinderizar] = useState<boolean>(false);
  const [inputQuantities, setInputQuantities] = useState<{ [productId: string]: number }>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/users');
        const allUsers: User[] = response.data;

        const foundUser = allUsers.find(u => u.email === state.user);

        if (foundUser) {
          setUser(foundUser);

          const loadProducts = async () => {
            try {
              const purchaseItemsResponse = await api.get('/purchaseitems');
              const allPurchaseItems: PurchaseItems[] = purchaseItemsResponse.data;

              const createProductsList = async () => {
              // eslint-disable-next-line
                let products = [];
                for (const elemento of allPurchaseItems) {

                  if (foundUser._id == elemento.userId) {
                    const response = await api.get(`/products/${elemento['productId']}`);
                    products.push(response.data);
                  }
                }
                return products;
              };

              const newProducts = await createProductsList();
              setProducts(newProducts);
              setReinderizar(true);

              if (newProducts.length === 0) {
                setReinderizar(false);
              }
            } catch (error) {
              console.error(error);
            }

          };

          loadProducts();
        } else {
          console.log(`Usuário com o email ${state.user} não encontrado.`);
        }
      } catch (error) {
        console.error(`Erro ao buscar os usuários: ${error}`);
      }
    };


    fetchUserData();
  }, [state.user]);

  const handleAddQuantity = (productId: string, maxQuantity: number) => {


    const valuesArray = Object.values(inputQuantities);
    const primeiroNumero = valuesArray.find(value => typeof value === 'number') || 1;

    if (primeiroNumero <= maxQuantity) {
      setInputQuantities((prev) => ({
        ...prev,
        [productId]: (prev[productId] || 0) + 1,
      }));
    } else {
      toast.error('Você não pode comprar mais do que a quantidade em estoque');
    }
  };

  const handleRemoveQuantity = (productId: string) => {
    const valuesArray = Object.values(inputQuantities);
    const primeiroNumero = valuesArray.find(value => typeof value === 'number') || 1;

    if (primeiroNumero == 0) {
      setInputQuantities(prev => ({
        ...prev,
        [productId]: (prev[productId] || 0) - 1,
      }));
    } else {
      toast.error('Você não pode comprar zero produtos');
    }

  };

  return (
    <>
      <NavBar />
      {reinderizar ? (
        <>
          <Main>
            <ContainerCart>
              <Titulo>Meu carrinho de compras</Titulo>
              {products.map(item => (
                <ContainerCarts key={item._id}>
                  <ProductDetailsCart key={item._id}>
                    <NameProduct>{item.name}</NameProduct>
                    <ContainerInput>
                      <div>
                        <h2>
                          Quantidade: {inputQuantities[item._id] || 1}
                        </h2>
                        <div>
                          <CaretUpIcon onClick={() => handleAddQuantity(item._id, item.quantity)} color='#121214' />
                          <CaretDownIcon onClick={() => handleRemoveQuantity(item._id)} color='#121214' />
                        </div>
                      </div>
                    </ContainerInput>
                    <p>Preço: {item.price}</p>
                    <p>{item.description}</p>
                    <p></p>
                  </ProductDetailsCart>
                  <ProductImg>
                    <Image
                      src={`/uploads/${item.imagePath}`}
                      width={520}
                      height={480}
                      alt={`${item.name}`}
                    />
                  </ProductImg>
                </ContainerCarts>
              ))}
            </ContainerCart>
            <Infomrations>
              <Titulo>Resumo da compra</Titulo>
              <DetailsInformation>

                <p>subtotal</p>

                <p>{products.length}</p>

              </DetailsInformation>
            </Infomrations>
          </Main>
          <Footer />
        </>
      ) : (
        <Main>
          <ContainerCartT>
            <Titulo>Meu carrinho de compras</Titulo>

            <Nothing>Não há nada aqui...</Nothing>
          </ContainerCartT>
        </Main>
      )}
    </>
  );
}
