import path from 'node:path';

import { Router } from 'express';
import multer, { Multer } from 'multer';

import { createCategory } from './app/useCases/categories/createCategory';
import { listCategories } from './app/useCases/categories/listCategories';
import { listProductByCategory } from './app/useCases/categories/listProductByCategory';

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


router.post('/categories', createCategory);
router.get('/categories', listCategories);
router.get('/categories/:categoryId/products', listProductByCategory);
