import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { findUserByUsername, comparePassword, seedUsers } from '../models/user.model';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto_super_seguro_cambiar';
const JWT_EXPIRES_IN: SignOptions['expiresIn'] = (process.env.JWT_EXPIRES_IN as SignOptions['expiresIn']) || '8h';

export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: number;
    username: string;
    role: 'ADMIN' | 'USER';
  };
}

export class AuthService {
  async login({ username, password }: LoginInput): Promise<LoginResponse> {
    if (!username || !password) {
      return { success: false, message: 'Usuario y contraseña son obligatorios.' };
    }

    await seedUsers();

    const user = await findUserByUsername(username);
    if (!user || !user.password) {
      return { success: false, message: 'Credenciales incorrectas.' };
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: 'Credenciales incorrectas.' };
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return {
      success: true,
      message: 'Login exitoso.',
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    };
  }
}