import { Request, Response } from 'express';

import { PurchaseItem } from '../../models/PurchaseItem';

export async function createPurchaseItem(req: Request, res: Response) {
  try {
    const { userId, productId, PurchaseId }  = req.body;

    const purchaseItem = await PurchaseItem.create({userId, productId, PurchaseId });

    if (!userId) {
      return res.status(400).json({
        error: 'userid is required',
      });
    }

    if (!productId) {
      return res.status(400).json({
        error: 'ProductId is required',
      });
    }

    res.status(201).json(purchaseItem);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
