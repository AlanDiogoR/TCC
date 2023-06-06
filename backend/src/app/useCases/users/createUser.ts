import { Request, Response } from 'express';

import { User } from '../../models/User';

export async function createUser(req: Request, res: Response) {
  try {
    const { name, password, email, createAt } = req.body;


    const user = await User.create({ name, password, email, createAt });

    if (!name) {
      return res.status(400).json({
        error: 'Name is required',
      });
    }

    if (!password) {
      return res.status(400).json({
        error: 'Passoword is required',
      });
    }

    if (!email) {
      return res.status(400).json({
        error: 'Email is required',
      });
    }

    if (!createAt) {
      return res.status(400).json({
        error: 'CreateAt is required',
      });
    }

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
