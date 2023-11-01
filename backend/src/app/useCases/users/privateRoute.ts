import { NextFunction, Request, Response } from 'express';

import { User } from '../../models/User';

export async function privateRoute(req: Request, res: Response) {
  const id = req.params.id;

  const user = await User.findById(id, '-password');

  if (!user) {
    return res.status(404).json({ msg: 'user undefined'});
  }

  function chechToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('')[1];

    if (!token) {
      return res.status(401).json({msg: 'acesso negado'});
    }
  }

  res.status(200).json({user});
}
