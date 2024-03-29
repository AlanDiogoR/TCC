import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export async function listProductById(req: Request, res: Response) {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        error: 'ProductId is required',
      });
    }

    const product = await Product.findById(productId);


    if (!product) {
      return res.status(404).json({
        error: 'Product not found',
      });
    }

    res.json(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
