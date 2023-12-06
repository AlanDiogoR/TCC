import { Request, Response } from 'express';
import { User } from '../../models/User';
import bcrypt from 'bcrypt';

export async function changeUserPassword(req: Request, res: Response) {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    // Verifica se o usuário existe
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: 'Usuário não encontrado',
      });
    }

    // Verifica a senha atual usando bcrypt.compare
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Senha atual incorreta',
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
