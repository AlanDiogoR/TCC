import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function crateProduct(req: Request, res: Response) {
  try {
    const { name, description, price, category, ingredients} = req.body;
    const imagePath = req.file?.filename;

    const product = await Product.create({
      name,
      description,
      imagePath,
      price: Number(price),
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    });

    if (!name) {
      return res.status(400).json({
        error: 'Name is required',
      });
    }

    if (!description) {
      return res.status(400).json({
        error: 'Description is required',
      });
    }

    if (!price) {
      return res.status(400).json({
        error: 'Price is required',
      });
    }

    if (!category) {
      return res.status(400).json({
        error: 'Category is required',
      });
    }

    if (!ingredients) {
      return res.status(400).json({
        error: 'Ingredients is required',
      });
    }

    if (!product) {
      return res.status(400).json({
        error: 'Product is required',
      });
    }

    if (!imagePath) {
      return res.status(400).json({
        error: 'ImagePath is required',
      });
    }



    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
