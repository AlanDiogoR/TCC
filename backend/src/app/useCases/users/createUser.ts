import { Request, Response } from 'express';

import { User } from '../../models/User';

export async function createUser(req: Request, res: Response) {
  try {
    const { name, password, email, createAt } = req.body;


    const user = await User.create({ name, password, email, createAt });

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}