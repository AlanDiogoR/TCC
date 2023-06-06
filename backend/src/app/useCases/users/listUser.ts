import { Request, Response } from 'express';

import { User } from '../../models/User';

export async function listUser(req: Request, res: Response) {
  try {
    const user = await User.find();

    if (!user) {
      return res.status(400).json({
        error: 'User is required',
      });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
