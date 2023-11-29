import { Request, Response } from 'express';
import { User } from '../../models/User';

export async function listUserByEmail(req: Request, res: Response) {
  try {
    const { userEmail } = req.params;

    if (!userEmail) {
      return res.status(400).json({
        error: 'userEmail is required',
      });
    }

    // Use um método de consulta para encontrar o usuário por e-mail
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({
        error: 'user not exists',
      });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
