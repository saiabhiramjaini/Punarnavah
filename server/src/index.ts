import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRouter from './routes/userRoutes';
import wasteReqRouter from './routes/wasteReqRoutes';
import contributionsRouter from './routes/contributionsRoutes';
import innovativeProdsRouter from './routes/innovativeProdsRoutes';
import bulkWasteRouter from './routes/bulkWasteRoutes';
import authRouter from './routes/authRoutes';
import satisfiedWasteOrdersRouter from './routes/satisfiedWasteOrdersRoutes';
import innovativeProdOrdersRouter from './routes/innovativeProdOrdersRouter';
import bulkWasteOrdersRouter from './routes/bulkWasteOrdersRoutes';

require('dotenv').config();

const app = express();

app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    credentials: true,
  }
));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/waste-req", wasteReqRouter);
app.use("/api/v1/contributions", contributionsRouter);
app.use("/api/v1/innovative-prod", innovativeProdsRouter);
app.use("/api/v1/satisfied-waste-orders", satisfiedWasteOrdersRouter);
app.use("/api/v1/innovative-prod-orders", innovativeProdOrdersRouter);
app.use("/api/v1/bulk-waste-orders", bulkWasteOrdersRouter);
app.use("/api/v1/bulk-waste", bulkWasteRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});