import NavBar from '@/components/NavBar/NavBar';
import {
  ContainerCart,
  ContainerCartT,
  ContainerCarts,
  ContainerInput,
  DetailsInformation,
  Infomrations,
  Main,
  NameProduct,
  Nothing,
  ProductDetailsCart,
  ProductImg,
  Titulo,
  TrashButton,
  Value
} from './styles';
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
import { formatCurrency } from '@/utils/formatCurrency';
import { Adress } from '@/types/Adress';

export default function YourPurchases() {
  const [address, setAddress] = useState<Adress | null>(null);
  const { state } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [reinderizar, setReinderizar] = useState<boolean>(false);
  const [inputQuantities, setInputQuantities] = useState<{ [productId: string]: number }>({});
  const [value, setValue] = useState(12);
  const [dia, setDia] = useState(5);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/users');
        const allUsers: User[] = response.data;

        const foundUser = allUsers.find(u => u.email === state.user);

        if (foundUser) {
          setUser(foundUser);

          const { products: newProductsArray } = await loadProducts();
          setProducts(newProductsArray);
          setReinderizar(newProductsArray.length > 0);
        } else {
          console.log(`Usuário com o email ${state.user} não encontrado.`);
        }
      } catch (error) {
        console.error(`Erro ao buscar os usuários: ${error}`);
      }
    };

    const fetchAddressData = async () => {
      try {
        const addressResponse = await api.get('/addresses');
        const allAddresses: Adress[] = addressResponse.data;

        if (Array.isArray(allAddresses)) {
          const foundAddress = allAddresses.find(address => address.userId === user?._id);

          if (foundAddress) {
            setAddress(foundAddress);
          } else {
            console.log(`Endereço com o id: ${user?._id} não encontrado.`);
          }
        } else {
          console.log('Os endereços não são um array.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAddressData();
    fetchUserData();
  }, [state.user]);

  useEffect(() => {
    const fetchData = async () => {
      const { products: newProductsArray } = await loadProducts();
      setProducts(newProductsArray);
      setReinderizar(newProductsArray.length > 0);
    };

    fetchData();
  }, [user]);

  const loadProducts = async () => {
    try {
      const purchaseItemsResponse = await api.get('/purchaseitems');
      const allPurchaseItems: PurchaseItems[] = purchaseItemsResponse.data;

      const createProductsList = async () => {
        // eslint-disable-next-line
        let products = [];
        // eslint-disable-next-line
        let quantities: { [productId: string]: number } = {};

        for (const elemento of allPurchaseItems) {
          quantities[elemento.productId] = elemento.quantity;

          if (user?._id === elemento.userId) {
            const response = await api.get(`/products/${elemento['productId']}`);
            const detailedProduct = { ...response.data, purchaseItemId: elemento._id };
            products.push(detailedProduct);
          }
        }

        setInputQuantities(quantities);

        return products; // Retorna apenas os produtos
      };

      const newProducts = await createProductsList();
      return { products: newProducts, allPurchaseItems };
    } catch (error) {
      console.error('Erro ao carregar os produtos', error);
      return { products: [], allPurchaseItems: [] };
    }
  };

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

    if (primeiroNumero === 0) {
      setInputQuantities(prev => ({
        ...prev,
        [productId]: (prev[productId] || 0) - 1,
      }));
    } else {
      toast.error('Você não pode comprar zero produtos');
    }
  };

  const calculateTotal = () => {
    let total = 0;

    products.forEach(item => {
      const quantity = inputQuantities[item._id] || 1;
      total += quantity * item.price;
    });

    return total;
  };

  function getRandomNumber() {
    const teste = Math.floor(Math.random() * (8 - 15 + 1)) + 8;
    setValue(teste);
  }

  function getRandomEntrega() {
    const tested = Math.floor(Math.random() * (4 - 8 + 1)) + 3;
    setDia(tested);
  }

  return (
    <>
      <NavBar />
      {reinderizar ? (
        <>
          <Main>
            <ContainerCart>
              <Titulo>Seus pedidos!</Titulo>
              {products.map(item => (
                <ContainerCarts key={item._id}>
                  <ProductDetailsCart key={item._id}>
                    <NameProduct>{item.name}</NameProduct>
                    <ContainerInput>
                      <div>
                        <p>
                          Quantidade: {inputQuantities[item._id] || 1}
                        </p>
                      </div>
                    </ContainerInput>
                    <p>Preço: {formatCurrency(item.price)} </p>
                    <p>{item.details}</p>
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
                <h1><strong>Subtotal: ({products.length} item(s))</strong>  {formatCurrency(calculateTotal())}</h1>
                <div>
                  <footer>
                    <p>Entrega em até: {address?.city === 'Fartura' ? '2 dia(s)' : `${dia} dia(s)`}</p>
                    <p>No endereço: {address?.city}, {address?.neighborhood}</p>
                    <p>Numero: {address?.numberHouse}</p>
                  </footer>
                </div>

                <Value>
                  <h2>Valor total:</h2>
                  <p>{formatCurrency(calculateTotal())} {address?.city === 'Fartura' ?  null : `+ ${formatCurrency(value)}`}</p>
                </Value>
              </DetailsInformation>
            </Infomrations>
          </Main>
        </>
      ) : (
        <Main>
          <ContainerCartT>
            <Titulo>Meus pedidos</Titulo>
            <Nothing>Não há nada aqui...</Nothing>
          </ContainerCartT>
        </Main>
      )}

      <Footer />
    </>
  );
}
