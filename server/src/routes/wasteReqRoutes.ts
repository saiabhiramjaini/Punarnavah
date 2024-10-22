import { Router } from "express";
import { uploadWasteReq, getWasteReq, getWasteReqById, getUnsatisfiedWasteReq, getSatisfiedWasteReq } from "../controllers/wasteReqControllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const wasteReqRouter = Router();

wasteReqRouter.post('/', authMiddleware as any, uploadWasteReq as any);
wasteReqRouter.get('/', getWasteReq as any);
wasteReqRouter.get('/unsatisfied', getUnsatisfiedWasteReq as any);
wasteReqRouter.get('/satisfied', authMiddleware as any, getSatisfiedWasteReq as any);
wasteReqRouter.get('/:id', authMiddleware as any, getWasteReqById as any);


export default wasteReqRouter;