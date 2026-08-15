import { Router } from 'express';
import { login } from '../controllers/auth.controller';

export const authRoutes: Router = Router();

authRoutes.post('/login', login);