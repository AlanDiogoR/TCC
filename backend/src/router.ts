

import { Router } from 'express';

import { createCategory } from './app/useCases/categories/createCategory';
import { listCategories } from './app/useCases/categories/listCategories';
import { listProductByCategory } from './app/useCases/categories/listProductByCategory';
import { deleteCategory } from './app/useCases/categories/deleteCategory';


export const router = Router();



//list category

router.get('/categories', listCategories);

//create category

router.post('/categories', createCategory);


//get product by category

router.get('/categories/:categoryId/products', listProductByCategory);

//delete

router.delete('/categories/:categoryId', deleteCategory);
