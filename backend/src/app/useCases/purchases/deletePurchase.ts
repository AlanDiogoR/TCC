import { Request, Response } from 'express';

import { Purchase } from '../../models/Purchase';

export async function deletePurchase(req: Request, res: Response) {
  try {
    const { purchaseId } = req.params;

    await Purchase.findByIdAndDelete(purchaseId);

    if (!purchaseId) {
      return res.status(400).json({
        error: 'PurchaseId is required',
      });
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
