import { Router } from 'express';
import { forgotPassword, logout, signin, signup, profile, resetPassword } from '../controllers/authControllers';
import { authMiddleware } from '../middlewares/authMiddleware';

const authRouter: Router = Router();

authRouter.post('/signup', signup as any);
authRouter.post('/signin', signin as any);
authRouter.post('/forgot-password', forgotPassword as any);
authRouter.get('/profile', authMiddleware as any, profile as any);
authRouter.post('/reset-password/:token', authMiddleware as any, resetPassword as any);
authRouter.post('/logout', logout as any);

export default authRouter;