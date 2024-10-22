import {Router} from 'express';
import { contribute } from '../controllers/contributionsControllers';
import { authMiddleware } from '../middlewares/authMiddleware';

const contributionsRouter = Router();

contributionsRouter.post('/:wasteRequestId', authMiddleware as any, contribute as any);

export default contributionsRouter;