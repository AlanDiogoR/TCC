import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../../models/User';

export async function createUser(req: Request, res: Response) {
  try {
    const { name, password, email, createAt,  } = req.body;

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const nameHash = await bcrypt.hash(name, salt);

    //const user = await User.create({ name, password, email, createAt });
    const usern = new User({
      name: nameHash,
      password: passwordHash,
      email,
      createAt
    });


    const userExists = await User.findOne({ email : email});


    if (userExists) {
      return res.status(422).json({
        error: 'Por favor, utilize outro email!',
      });
    }


    if (!name) {
      return res.status(422).json({
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

    await usern.save();



    res.status(201).json(usern);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
