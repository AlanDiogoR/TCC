import { Request, Response } from 'express';
import { Product } from '../../models/Product';



export async function listProductByCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    const products = await Product
      .find()
      .where('category')
      .equals(categoryId)
    ;

    if (!categoryId) {
      return res.status(400).json({
        error: 'CategoryId is required',
      });
    }

    if (!products) {
      return res.status(400).json({
        error: 'Products is required',
      });
    }

    res.json(products);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
