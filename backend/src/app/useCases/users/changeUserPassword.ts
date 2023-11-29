// userChangePassword.ts

import { Request, Response } from 'express';
import { User } from '../../models/User';

export async function changePassword(req: Request, res: Response) {
  try {
    const { userId, currentPassword, newPassword } = req.body;


    // Verifica se o usuário existe
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: 'Usuário não encontrado',
      });
    }

    // Verifica a senha atual
    if (user.password !== currentPassword) {
      return res.status(401).json({
        error: 'Senha atual incorreta',
      });
    }

    // Atualiza a senha do usuário
    user.password = newPassword;
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
