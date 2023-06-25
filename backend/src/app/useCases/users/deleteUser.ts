import { Request, Response } from 'express';

import { User } from '../../models/User';

export async function deleteUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    await User.findByIdAndDelete(userId);

    if (!userId) {
      return res.status(400).json({
        error: 'UserId is required',
      });
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
