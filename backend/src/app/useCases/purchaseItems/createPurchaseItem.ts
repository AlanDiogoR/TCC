import { Request, Response } from 'express';

import { PurchaseItem } from '../../models/PurchaseItem';

export async function createPurchaseItem(req: Request, res: Response) {
  try {
    const { userId, value, productId, PurchaseId }  = req.body;

    const purchaseItem = await PurchaseItem.create({userId, value, productId, PurchaseId });

    if (!userId) {
      return res.status(400).json({
        error: 'userid is required',
      });
    }

    if (!value) {
      return res.status(400).json({
        error: 'Value is required',
      });
    }

    if (!productId) {
      return res.status(400).json({
        error: 'ProductId is required',
      });
    }

    if (!PurchaseId) {
      return res.status(400).json({
        error: 'PurchaseId is required',
      });
    }

    if (!productId) {
      return res.status(400).json({
        error: 'ProductId is required',
      });
    }

    if (!PurchaseId) {
      return res.status(400).json({
        error: 'PurchaseId is required',
      });
    }

    if (!purchaseItem) {
      return res.status(400).json({
        error: 'PurchaseItem is required',
      });
    }

    res.status(201).json(purchaseItem);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
