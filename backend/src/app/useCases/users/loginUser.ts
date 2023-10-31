import { Request, Response } from 'express';



export async function loginUser(req: Request, res: Response) {
  try {
    const { password, email, } = req.body;

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
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
