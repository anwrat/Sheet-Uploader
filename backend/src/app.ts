import express from 'express';
import { errorHandler } from './middleware/errorHandler.middleware.js';
import sheetRoutes from './routes/sheetUpload.routes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/sheet',sheetRoutes);

app.use(errorHandler);

export default app;