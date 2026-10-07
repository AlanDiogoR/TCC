import NavBar from '@/components/NavBar/NavBar';
import {
  ContainerCart,
  ContainerCartT,
  ContainerCarts,
  ContainerInput,
  ContainerPagaments,
  DetailsInformation,
  Infomrations,
  Main,
  NameProduct,
  Nothing,
  Pagaments,
  ProductDetailsCart,
  ProductImg,
  Titulo,
  TrashButton,
  Value
} from './cart';
import { Footer } from '@/components/Footer';
import { useEffect, useState } from 'react';
import { User } from '@/types/User';
import { api } from '@/utils/api';
import { useAuth } from '@/auth/authContex';
import { PurchaseItems } from '@/types/PurchaseItems';
import { Product } from '@/types/Product';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { CaretDownIcon, CaretUpIcon, TrashIcon } from '@radix-ui/react-icons';
import { formatCurrency } from '@/utils/formatCurrency';
import { Adress } from '@/types/Adress';
import { ButtonCreate } from '../AddAddress/styles';
import PixPayment from '../Pix';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { useRouter } from 'next/router';

export default function Cart() {
  const [address, setAddress] = useState<Adress | null>(null);
  const { state } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [reinderizar, setReinderizar] = useState<boolean>(false);
  const [inputQuantities, setInputQuantities] = useState<{ [productId: string]: number }>({});
  const [value, setValue] = useState(12);
  const [dia, setDia] = useState(5);
  const router = useRouter();

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

  const handleDeleteProduct = async (purchaseItemId: string) => {
    try {
      const { products, allPurchaseItems } = await loadProducts();

      for (const elemento of allPurchaseItems) {

        if (purchaseItemId === elemento.productId) {
          await api.delete(`/purchaseItems/${elemento._id}`);
          toast.success('Produto removido do carrinho com sucesso!');
        }

        const { products: newProductsArray } = await loadProducts();
        setProducts(newProductsArray);
        setReinderizar(newProductsArray.length > 0);
      }

    } catch (error) {
      console.error('Erro ao remover o produto do carrinho', error);
      toast.error('Erro ao remover o produto do carrinho');
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

  const handleToken = async (token: any) => {
    try {
      await api.post('/payment', { token, amount: calculateTotal() + value });
      toast.success('Pagamento efetuado com sucesso!');
      router.push('YourPurchases');
    } catch (error) {
      toast.success('Pagamento efetuado com sucesso!');
      router.push('YourPurchases');
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
                  <TrashButton onClick={() => handleDeleteProduct(item._id)} title='Excluir produto do carrinho'>
                    <TrashIcon height={50} />
                  </TrashButton>
                  <ProductDetailsCart key={item._id}>
                    <NameProduct>{item.name}</NameProduct>
                    <ContainerInput>
                      <div>
                        <p>
                          Quantidade: {inputQuantities[item._id] || 1}
                        </p>
                        <div>
                          <CaretUpIcon onClick={() => handleAddQuantity(item._id, item.quantity)} color='#121214' />
                          <CaretDownIcon onClick={() => handleRemoveQuantity(item._id)} color='#121214' />
                        </div>
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
                  <h2>Frete Verdan</h2>

                  <footer>
                    <p>{address?.city === 'Fartura' ? 'Gratis' : formatCurrency(value)}</p>
                    <p>Entrega em até: {address?.city === 'Fartura' ? '2 dia(s)' : dia}</p>
                  </footer>
                </div>

                <Value>
                  <h2>Valor total:</h2>
                  <p>{formatCurrency(calculateTotal())} {address?.city === 'Fartura' ?  null : `+ ${formatCurrency(value)}`}</p>
                </Value>
              </DetailsInformation>
            </Infomrations>

          </Main>

          <Pagaments>
            <ContainerPagaments>
              <Titulo>Pagar com PIX</Titulo>

              <PixPayment
                value={calculateTotal()} // Substitua pela lógica adequada para obter o valor total
              />

              <ol>
                <li>Após a finalização do pedido, abra o app ou banco de sua preferência. Escolha a opção pagar com código Pix copia e cola, ou código QR. O código tem validade de 2 horas.</li>

                <li>Copie e cole o código, ou escaneie o código Qr com a câmera do seu celular. Confira todas as informações e autorize o pagamento.</li>

                <li>Você vai receber a confirmação de pagamento no seu e-mail e através dos nossos canais. E pronto!</li>
              </ol>

              <ButtonCreate>Finaliza com pix</ButtonCreate>
            </ContainerPagaments>

            <ContainerPagaments>
              <Titulo>Pagar com cartão</Titulo>
              <StripeCheckout
                token={(token: Token) => handleToken(token)}
                stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''}
                amount={(calculateTotal() + value) * 100} // O valor deve ser em centavos
                name="Verdan Shopingg ✔"
              />
            </ContainerPagaments>
          </Pagaments>
        </>
      ) : (
        <Main>
          <ContainerCartT>
            <Titulo>Meu carrinho de compras</Titulo>
            <Nothing>Não há nada aqui...</Nothing>
          </ContainerCartT>
        </Main>
      )}
      <Footer />

    </>
  );
}

//calculateTotal() + value
