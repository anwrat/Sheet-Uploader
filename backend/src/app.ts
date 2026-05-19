import express from 'express';
import { errorHandler } from './middleware/errorHandler.middleware.js';
import sheetRoutes from './routes/sheetUpload.routes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization',
        'Upload-Length', 'Upload-Offset', 'Upload-Metadata', 'Upload-Defer-Length', 'Upload-Concat', 'Tus-Resumable'
    ],
    exposedHeaders: [
        'Upload-Offset', 'Location', 'Upload-Length', 'Upload-Metadata', 'Upload-Concat', 'Tus-Resumable'
    ],
}));

//Routes
app.use('/api/sheet',sheetRoutes);

app.use(errorHandler);

export default app;