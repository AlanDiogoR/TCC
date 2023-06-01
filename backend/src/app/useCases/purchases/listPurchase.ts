import { Request, Response } from 'express';

import { Purchase } from '../../models/Purchase';

export async function listPurchase(req: Request, res: Response) {
  try {
    const purchase = await Purchase.find();

    res.json(purchase);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
