import { Router } from 'express';
import { getUserInfo } from '../controllers/userControllers';
import { authMiddleware } from '../middlewares/authMiddleware';

const userRouter = Router();

userRouter.get('/', authMiddleware as any, getUserInfo as any);

export default userRouter;