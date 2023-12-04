import NavBar from '@/components/NavBar/NavBar';
import { ContainerCart, ContainerCarts, DetailsInformation, Infomrations, Main, NameProduct, ProductDetailsCart, ProductImg, Titulo } from './cart';
import { Footer } from '@/components/Footer';
import { useEffect, useState } from 'react';
import { User } from '@/types/User';
import { api } from '@/utils/api';
import { useAuth } from '@/auth/authContex';
import { PurchaseItems } from '@/types/PurchaseItems';
import { Product } from '@/types/Product';
import Image from 'next/image';

type ProductIds = string[];


export default function Cart() {
  const [user, setUser] = useState<User | null>(null);
  const { state } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [reinderizar, setReinderizar] = useState<boolean>(false);

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

    const loadProducts = async () => {
      try {
        const purchaseItemsResponse = await api.get('/purchaseitems');
        const allPurchaseItems: PurchaseItems[] = purchaseItemsResponse.data;

        const createProductsList = async () => {
          let products = [];
          for (const elemento of allPurchaseItems) {
            const response = await api.get(`/products/${elemento['productId']}`);
            products.push(response.data);
          }
          return products;
        };

        const newProducts = await createProductsList();
        setProducts(newProducts);
        setReinderizar(true);
      } catch (error) {
        console.error(error);
      }

    };

    fetchUserData();
    loadProducts();
  }, []);

  return (
    <>
      <NavBar />
      {reinderizar && (
        <>
          <Main>
            <ContainerCart>
              <Titulo>Meu carrinho de compras</Titulo>
              {products.map(item => (
                <ContainerCarts key={item._id}>
                  <ProductDetailsCart>
                    <NameProduct>{item.name}</NameProduct>
                    <p>Quantidade: {item.quantity}</p>
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

              </DetailsInformation>
            </Infomrations>
          </Main>
          <Footer />
        </>
      )}
    </>
  );
}
