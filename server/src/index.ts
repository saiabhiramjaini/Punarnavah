import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

require('dotenv').config();

import userRouter from './routes/userRoutes';
import wasteReqRouter from './routes/wasteReqRoutes';
import contributionsRouter from './routes/contributionsRoutes';
import innovativeProdsRouter from './routes/innovativeProdsRoutes';
import bulkWasteRouter from './routes/bulkWasteRoutes';
import authRouter from './routes/authRoutes';
import satisfiedWasteOrdersRouter from './routes/satisfiedWasteOrdersRoutes';
import innovativeProdOrdersRouter from './routes/innovativeProdOrdersRouter';
import bulkWasteOrdersRouter from './routes/bulkWasteOrdersRoutes';
import paymentRouter from './routes/paymentRoutes';

const app = express();

const corsOptions = {
  origin: [
    process.env.CLIENT_URL, 
    'https://punarnavah.abhiramverse.tech',
    'https://punarnavah.vercel.app'
  ].filter(Boolean) as string[],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
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
app.use("/api/v1/payment", paymentRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
