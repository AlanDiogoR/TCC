import { Request, Response } from 'express';

import { Address } from '../../models/Address';

export async function listAddress(req: Request, res: Response) {
  try {
    const address = await Address.find();

    if (!address) {
      return res.status(400).json({
        error: 'address is required',
      });
    }

    res.json(Address);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
