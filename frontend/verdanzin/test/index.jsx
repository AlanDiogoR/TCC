import NavBar from '@/components/NavBar/NavBar';
import { ContainerCart, ContainerCarts, ProductDetailsCart } from './cart';
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
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItems[]>([]);
  const [product, setProduct] = useState<Product[]>([]);
  const [productsIds, setProducstsIds] = useState<ProductIds>([]);
  const [ productsData, setProductsData] = useState<Product[]>([]);

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

    const fetchPurchaseItemsData = async () => {
      try {
        const purchaseItemsResponse = await api.get('/purchaseitems');
        const allPurchaseItems: PurchaseItems[] = purchaseItemsResponse.data;

        for (let i =  0; i < allPurchaseItems.length; i++ ) {
          alert('teste');
          if (allPurchaseItems[i]['userId'] === user?._id) {
            //alert('entre');
            const newPurchaseItems = [...purchaseItems, allPurchaseItems[i]];
            setPurchaseItems(newPurchaseItems);
            const newProductsIds = [...productsIds, allPurchaseItems[i]['productId']];
            setProducstsIds(newProductsIds);
            alert(JSON.stringify(productsIds));
          }
        }

        {/*if (allPurchaseItems) {
          const foundItems = allPurchaseItems.find(item => item.userId === user?._id);
          setPurchaseItems(foundItems ? [foundItems] : []);
        } else {
          console.log('Os itens de compra não são um array.');
        }*/}
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData = async () => {
      try {
        if (productsIds.length > 0) {
          for (let i = 0; i < productsIds.length; i++)  {
            const response = await api.get(`/products/${productsIds[i]}`);
            const newProductsData = [...productsData, response.data];
            setProductsData(newProductsData);
          }

          const products = productsData.map(productData => ({
            _id: productData._id || '',
            name: productData.name || '',
            description: productData.description || '',
            details: productData.details || '',
            imagePath: productData.imagePath || '',
            price: productData.price || 0,
            quantity: productData.quantity || 0,
          }));

          console.log('Products:', products);

          setProduct(products);
        } else {
          console.log('Nenhum produto encontrado para os itens de venda.');
        }
      } catch (error) {
        console.log(`Erro ao buscar os produtos: ${error}`);
      }
    };

    fetchUserData()
      .then(fetchPurchaseItemsData)
      .then(fetchData);
  }, [state.user, purchaseItems]);

  return (
    <>
      <NavBar />

      <ContainerCart>
        <h1>Carrinho de compras</h1>

        {product.map(item => (
          <ContainerCarts key={item._id}>
            <ProductDetailsCart>
              <p>{item.name}</p>
              <p>{item.quantity}</p>
              <p>{item.price}</p>
            </ProductDetailsCart>
            <div>
              <Image
                src={`/uploads/${item.imagePath}`}
                width={520}
                height={480}
                alt={`${item.name}`}
              />
            </div>
          </ContainerCarts>
        ))}
      </ContainerCart>

      <Footer />
    </>
  );
}
