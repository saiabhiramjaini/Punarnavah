import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createBulkWasteOrder, getBulkWasteOrders, getBulkWasteOrderById, updateBulkWasteOrder  } from '../controllers/bulkWasteOrdersControllers';

const bulkWasteOrdersRouter = Router();

bulkWasteOrdersRouter.post('/', authMiddleware as any, createBulkWasteOrder as any);
bulkWasteOrdersRouter.get('/', authMiddleware as any, getBulkWasteOrders as any);
bulkWasteOrdersRouter.get('/:id', authMiddleware as any, getBulkWasteOrderById as any);
bulkWasteOrdersRouter.put('/:id', authMiddleware as any, updateBulkWasteOrder as any);

export default bulkWasteOrdersRouter;