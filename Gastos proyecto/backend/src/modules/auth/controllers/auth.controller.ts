import { Request, Response } from 'express';
import { AuthService, LoginInput } from '../services/auth.service';

const authService = new AuthService();

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const input: LoginInput = {
      username: req.body.username?.trim(),
      password: req.body.password
    };

    const result = await authService.login(input);

    if (!result.success) {
      res.status(401).json(result);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al procesar el login.'
    });
  }
}