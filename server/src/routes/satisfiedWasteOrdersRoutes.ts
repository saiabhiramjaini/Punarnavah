import { Router } from 'express';
import { createSatisfiedOrder, getSatisfiedOrderById, getSatisfiedOrders, updateSatisfiedOrder } from '../controllers/satisfiedWasteOrdersControllers';
import { authMiddleware } from '../middlewares/authMiddleware';

const satisfiedWasteOrdersRouter = Router();

satisfiedWasteOrdersRouter.post('/', authMiddleware as any, createSatisfiedOrder as any);
satisfiedWasteOrdersRouter.get('/', authMiddleware as any, getSatisfiedOrders as any);
satisfiedWasteOrdersRouter.get('/:id', authMiddleware as any, getSatisfiedOrderById as any);
satisfiedWasteOrdersRouter.put('/:id', authMiddleware as any, updateSatisfiedOrder as any);

export default satisfiedWasteOrdersRouter;
