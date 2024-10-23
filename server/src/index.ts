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


// Define allowed origins
const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://punarnavah.abhiramverse.tech',
  // Add any other allowed origins here
];

// CORS configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Additional security headers middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// app.use(cors(
//   {
//     origin: "https://punarnavah.abhiramverse.tech/",
//     credentials: true,
//   }
// ));
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