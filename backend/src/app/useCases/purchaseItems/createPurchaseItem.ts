import { Request, Response } from 'express';

import { PurchaseItem } from '../../models/PurchaseItem';

export async function createPurchaseItem(req: Request, res: Response) {
  try {
    const { products, value, productId, PurchaseId }  = req.body;


    const purchaseItem = await PurchaseItem.create({products, value, productId, PurchaseId });

    res.status(201).json(purchaseItem);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}