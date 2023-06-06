import { Request, Response } from 'express';

import { PurchaseItem } from '../../models/PurchaseItem';

export async function listPurchaseItem(req: Request, res: Response) {
  try {
    const purchaseItem = await PurchaseItem.find();

    if (!PurchaseItem) {
      return res.status(400).json({
        error: 'PurchaseItem is required',
      });
    }

    res.json(purchaseItem);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
