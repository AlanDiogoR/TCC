import { Request, Response } from 'express';

import { PurchaseItem } from '../../models/PurchaseItem';

export async function deletePurchaseItem(req: Request, res: Response) {
  try {
    const { PurchaseItemId } = req.params;

    await PurchaseItem.findByIdAndDelete(PurchaseItemId);

    if (!PurchaseItemId) {
      return res.status(400).json({
        error: 'PurchaseItemId is required',
      });
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
