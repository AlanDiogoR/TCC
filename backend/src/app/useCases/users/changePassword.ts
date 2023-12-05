import { Request, Response } from 'express';
import { User } from '../../models/User';
import bcrypt from 'bcrypt';

export async function changePassword(req: Request, res: Response) {
  try {
    const { userId, newPassword } = req.body;


    // Verifica se o usuário existe
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: 'Usuário não encontrado',
      });
    }
    // Atualiza a senha do usuário
    const newHashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = newHashedPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Senha alterada com sucesso',
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
