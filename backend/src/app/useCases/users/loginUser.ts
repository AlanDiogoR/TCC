import { Request, Response } from 'express';
import { User } from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function loginUser(req: Request, res: Response) {
  try {
    const { password, email, } = req.body;

    const user = await User.findOne({ email : email});

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET não definida. Veja .env.example.');
    }

    const token = jwt.sign(
      {
        id: user?._id,
      },
      secret,
    );




    if (!user) {
      return res.status(404).json({
        error: 'Usuário não encontrado!',
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

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ msg: 'Senha Inválida!'});
    }

    res.status(200).json({ msg: 'authentication completed successfully', token});

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
