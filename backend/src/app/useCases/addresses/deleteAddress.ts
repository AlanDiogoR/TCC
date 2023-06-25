import { Request, Response } from 'express';

import { Address } from '../../models/Address';

export async function deleteAddress(req: Request, res: Response) {
  try {
    const { addressId } = req.params;
    if (!addressId) {
      return res.status(400).json({
        error: 'addressId is required',
      });
    }
    }

    await Address.findByIdAndDelete(addressId);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
