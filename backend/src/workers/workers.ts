import {Worker} from 'bullmq';
import {connection} from "../config/bull.config.js";
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const processorPath = pathToFileURL(path.resolve(__dirname,'..','jobs', 'uploadtodb.ts'));

const worker = new Worker('upload-queue', processorPath,
    {
        connection, 
        concurrency: 3,
    },
);

worker.on('completed', (job)=>{
    console.log(`Job completed: ${job.id}`);
});

worker.on('failed', (job, err)=>{
    console.log(`Job failed: ${job!.id}`,err);
});

worker.on('error',(err)=>{
    console.error('Global Worker Error: ',err);
})