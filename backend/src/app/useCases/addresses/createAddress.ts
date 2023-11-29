import { Request, Response } from 'express';

import { Address } from '../../models/Address';

export async function createAddress(req: Request, res: Response) {
  try {
    const { zipCode, city, state, neighborhood, street, numberHouse, userId} = req.body;

    if (!zipCode) {
      return res.status(400).json({
        error: 'zipCode is required',
      });
    }

    if (!city) {
      return res.status(400).json({
        error: 'City is required',
      });
    }

    if (!state) {
      return res.status(400).json({
        error: 'State is required',
      });
    }

    if (!neighborhood) {
      return res.status(400).json({
        error: 'Neighborhood is required',
      });
    }

    if (!street) {
      return res.status(400).json({
        error: 'streets is required',
      });
    }

    if (!numberHouse) {
      return res.status(400).json({
        error: 'numberHouse is required',
      });
    }

    if (!userId) {
      return res.status(400).json({
        error: 'userId is required',
      });
    }


    const address = await Address.create({zipCode, city, state, neighborhood, street, numberHouse, userId});

    res.status(201).json(address);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
