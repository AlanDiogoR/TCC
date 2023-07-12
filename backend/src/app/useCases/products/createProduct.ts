import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function createProduct(req: Request, res: Response) {
  try {
    const { name, description, details, price, category } = req.body;
    const imagePath = req.file?.filename;

    const product = await Product.create({
      name,
      description,
      imagePath,
      details,
      price: Number(price),
      category,
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


    if (!details) {
      return res.status(400).json({
        error: 'Description is required',
      });
    }

    if (!price) {
      return res.status(400).json({
        error: 'Price is required',
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
