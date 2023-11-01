import path from 'node:path';

import { Router } from 'express';

import multer from 'multer';
import jwt from 'jsonwebtoken';


import { NextFunction, Request, Response } from 'express';


import { createCategory } from './app/useCases/categories/createCategory';
import { listCategories } from './app/useCases/categories/listCategories';
import { listProductByCategory } from './app/useCases/categories/listProductByCategory';
import { deleteCategory } from './app/useCases/categories/deleteCategory';
import { listProducts } from './app/useCases/products/listProduct';
import { listAddress } from './app/useCases/addresses/listAddress';
import { listPurchaseItem } from './app/useCases/purchaseItems/listPurchaseItem';
import { listPurchase } from './app/useCases/purchases/listPurchase';
import { listUser } from './app/useCases/users/listUser';
import { createAddress } from './app/useCases/addresses/createAddress';
import { createProduct } from './app/useCases/products/createProduct';
import { createPurchase } from './app/useCases/purchases/createPurchase';
import { createPurchaseItem } from './app/useCases/purchaseItems/createPurchaseItem';
import { createUser } from './app/useCases/users/createUser';
import { deleteAddress } from './app/useCases/addresses/deleteAddress';
import { deleteProduct } from './app/useCases/products/deleteProduct';
import { deletePurchaseItem } from './app/useCases/purchaseItems/deletePurchaseItem';
import { deletePurchase } from './app/useCases/purchases/deletePurchase';
import { deleteUser } from './app/useCases/users/deleteUser';
import { loginUser } from './app/useCases/users/loginUser';
import { User } from './app/models/User';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});




//public route
router.get('/', (req, res) => {
  res.status(200).json({ msg : 'Bem vindo a pagina publica'});
});

router.get('/users/:id', chechToken, async function (req: Request, res: Response) {
  const id = req.params.id;

  const user = await User.findById(id, '-password');

  if (!user) {
    return res.status(404).json({ msg: 'user undefined'});
  }



  res.status(200).json({user});
});

function chechToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({msg: 'acesso negado'});
  }

  try {

    const secret = 'ldsdjlsmfklmjdsj$%%@$367824848*156548*498765';
    jwt.verify(token, secret);

    next();

  } catch (error) {
    res.status(400).json({msg: 'tonken invalid'});
  }
}

//list

router.get('/categories', listCategories);

router.get('/products', listProducts);

router.get('/addresses', listAddress);

router.get('/purchaseItems', listPurchaseItem);

router.get('/purchases', listPurchase);

router.get('/users', listUser);


//create

router.post('/categories', createCategory);

router.post('/addresses', createAddress);

router.post('/products', upload.single('image'), createProduct);

router.post('/purchaseItems', createPurchaseItem);

router.post('/purchases', createPurchase);

router.post('/users', createUser);

router.post('/auth/login', loginUser);


//get product by category

router.get('/categories/:categoryId/products', listProductByCategory);

//delete

router.delete('/categories/:categoryId', deleteCategory);

router.delete('/addresses/:addressId', deleteAddress);

router.delete('/categories/:categoryId', deleteCategory);

router.delete('/products/:productId', deleteProduct);

router.delete('/purchaseItems/:PurchaseItemId', deletePurchaseItem);

router.delete('/purchases/:purchaseId', deletePurchase);

router.delete('/users/:userId', deleteUser);
