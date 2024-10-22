import { Router } from 'express';
import { uploadBulkWaste, getBulkWaste, getBulkWasteById } from '../controllers/bulkWasteControllers';
import { authMiddleware } from '../middlewares/authMiddleware';

const bulkWasteRouter = Router();

bulkWasteRouter.post('/', authMiddleware as any, uploadBulkWaste as any);
bulkWasteRouter.get('/', getBulkWaste as any);
bulkWasteRouter.get('/:id', authMiddleware as any, getBulkWasteById as any);

export default bulkWasteRouter;