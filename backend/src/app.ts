import express from 'express';
import { errorHandler } from './middleware/errorHandler.middleware.js';

const app = express();
app.use(express.json());

//Routes

app.use(errorHandler);

export default app;