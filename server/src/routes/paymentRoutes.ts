import { Router } from 'express';
import { payment, verifyPayment } from '../controllers/paymentControllers';
import { authMiddleware } from '../middlewares/authMiddleware';

const paymentRouter = Router();

paymentRouter.post('/create-order', authMiddleware as any, payment as any);
paymentRouter.post('/verify', authMiddleware as any, verifyPayment as any);

export default paymentRouter;