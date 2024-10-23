import { Router } from 'express';
import { payment, verifyPayment } from '../controllers/paymentControllers';
import { authMiddleware } from '../middlewares/authMiddleware';

const paymentRouter = Router();

paymentRouter.get('/', authMiddleware as any, payment as any);
paymentRouter.post('/', authMiddleware as any, verifyPayment as any);

export default paymentRouter;