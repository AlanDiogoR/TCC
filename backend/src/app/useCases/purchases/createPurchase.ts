import { Request, Response } from 'express';

import { Purchase } from '../../models/Purchase';

export async function createPurchase(req: Request, res: Response) {
  try {
    const { value, paymentMethod, status, date, addressId } = req.body;


    const purchase = await Purchase.create({ value, paymentMethod, status, date, addressId });

    res.status(201).json(purchase);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
