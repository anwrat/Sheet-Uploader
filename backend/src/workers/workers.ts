import {Worker} from 'bullmq';
import {ExcelParser} from '../utils/excelParser.js';
import {createUploadJob} from '../utils/jobs.js';
import { batchUpload } from "../utils/batch.js";
import {connection} from "../config/bull.config.js";

const worker = new Worker('upload-queue',  async (job) =>{
    console.log('Worker started');
    const {path, originalName} = job.data;
    console.time(`Processing file ${originalName}`);
    const parser = new ExcelParser();
    const data = await parser.extractData(path);
    const dbJob = await createUploadJob(originalName, data.length);
    await batchUpload(data, 1000, dbJob.id);
    console.timeEnd(`Processing file ${originalName}`);
},
    {connection},
);

worker.on('completed', (job)=>{
    console.log(`Job completed: ${job.id}`);
});

worker.on('failed', (job, err)=>{
    console.log(`Job completed: ${job!.id}`,err);
});

worker.on('error',(err)=>{
    console.error('Global Worker Error: ',err);
})