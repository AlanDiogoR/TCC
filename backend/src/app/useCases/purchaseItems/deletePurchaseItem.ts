import { Request, Response } from 'express';

import { PurchaseItem } from '../../models/PurchaseItem';

export async function deletePurchaseItem(req: Request, res: Response) {
  try {
    const { PurchaseItemId } = req.params;

    await PurchaseItem.findByIdAndDelete(PurchaseItemId);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}