import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function listCategories(req: Request, res: Response) {
  try {
    const categories = await Category.find();

    if (!categories) {
      return res.status(400).json({
        error: 'categories is required',
      });
    }

    res.json(categories);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
