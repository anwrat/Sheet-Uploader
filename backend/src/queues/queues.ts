import {Queue} from 'bullmq';
import {connection} from "../config/bull.config.js";

export const uploadQueue = new Queue('upload-queue',{connection}); 