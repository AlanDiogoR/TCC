

import { Router } from 'express';

import { createCategory } from './app/useCases/categories/createCategory';
import { listCategories } from './app/useCases/categories/listCategories';
import { listProductByCategory } from './app/useCases/categories/listProductByCategory';
import { deleteCategory } from './app/useCases/categories/deleteCategory';
import { listProducts } from './app/useCases/producties/listProduct';
import { listAddress } from './app/useCases/addresses/listAddress';
import { listPurchaseItem } from './app/useCases/purchaseItems/listPurchaseItem';
import { listPurchase } from './app/useCases/purchases/listPurchase';
import { listUser } from './app/useCases/users/listUser';
import { createAddress } from './app/useCases/addresses/createAddress';
import { crateProduct } from './app/useCases/producties/createProduct';
import { createPurchase } from './app/useCases/purchases/createPurchase';
import { createPurchaseItem } from './app/useCases/purchaseItems/createPurchaseItem';
import { createUser } from './app/useCases/users/createUser';
import { deleteAddress } from './app/useCases/addresses/deleteAddress';
import { deleteProduct } from './app/useCases/producties/deleteProduct';
import { deletePurchaseItem } from './app/useCases/purchaseItems/deletePurchaseItem';
import { deletePurchase } from './app/useCases/purchases/deletePurchase';
import { deleteUser } from './app/useCases/users/deleteUser';


export const router = Router();



//list

router.get('/categories', listCategories);

router.get('/producties', listProducts);

router.get('/addresses', listAddress);

router.get('/purchaseItems', listPurchaseItem);

router.get('/purchases', listPurchase);

router.get('/users', listUser);


//create

router.post('/categories', createCategory);

router.post('/addresses', createAddress);

router.post('/producties', crateProduct);

router.post('/purchaseItems', createPurchaseItem);

router.post('/purchases', createPurchase);

router.post('/users', createUser);


//get product by category

router.get('/categories/:categoryId/products', listProductByCategory);

//delete

router.delete('/categories/:categoryId', deleteCategory);

router.delete('/addresses/:addressId', deleteAddress);

router.delete('/categories/:categoryId', deleteCategory);

router.delete('/producties/:productId', deleteProduct);

router.delete('/purchaseItems/:PurchaseItemId', deletePurchaseItem);

router.delete('/purchases/:purchaseId', deletePurchase);

router.delete('/users/:userId', deleteUser);
