import { Request, Response } from 'express';

import { Address } from '../../models/Address';

export async function createAddress(req: Request, res: Response) {
  try {
    const { zipCode, city, state, neighborhood, streets, numberHouse, userId} = req.body;

    if (!zipCode) {
      return res.status(400).json({
        error: 'Name is required',
      });
    }

    const address = await Address.create({zipCode, city, state, neighborhood, streets, numberHouse, userId});

    res.status(201).json(address);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
