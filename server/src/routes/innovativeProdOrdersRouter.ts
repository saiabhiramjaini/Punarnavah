import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createInnovativeOrder, getInnovativeOrderById, getInnovativeOrders, updateInnovativeOrder } from '../controllers/innovativeProdOrdersControllers';

const innovativeProdOrdersRouter = Router();

innovativeProdOrdersRouter.post('/', authMiddleware as any, createInnovativeOrder as any);
innovativeProdOrdersRouter.get('/', authMiddleware as any, getInnovativeOrders as any);
innovativeProdOrdersRouter.get('/:id', authMiddleware as any, getInnovativeOrderById as any);
innovativeProdOrdersRouter.put('/:id', authMiddleware as any, updateInnovativeOrder as any);

export default innovativeProdOrdersRouter;