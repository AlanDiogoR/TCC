import { Request, Response } from 'express';

import { Purchase } from '../../models/Purchase';

export async function createPurchase(req: Request, res: Response) {
  try {
    const { value, paymentMethod, status, date, addressId } = req.body;


    const purchase = await Purchase.create({ value, paymentMethod, status, date, addressId });

    if (!value) {
      return res.status(400).json({
        error: 'Value is required',
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        error: 'PaymentMethod is required',
      });
    }

    if (!status) {
      return res.status(400).json({
        error: 'Status is required',
      });
    }

    if (!date) {
      return res.status(400).json({
        error: 'Date is required',
      });
    }

    if (!addressId) {
      return res.status(400).json({
        error: 'AddressId is required',
      });
    }

    res.status(201).json(purchase);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
