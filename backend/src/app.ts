import express from 'express';
import { errorHandler } from './middleware/errorHandler.middleware.js';
import sheetRoutes from './routes/sheetUpload.routes.js';

const app = express();
app.use(express.json());

//Routes
app.use('/api/sheet',sheetRoutes);

app.use(errorHandler);

export default app;