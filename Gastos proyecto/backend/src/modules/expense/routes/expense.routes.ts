import { Router } from 'express';
import { authMiddleware } from '../../../middlewares/auth.middleware';

export const expenseRoutes: Router = Router();

expenseRoutes.use(authMiddleware);

expenseRoutes.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Modulo de gastos disponible.'
  });
});