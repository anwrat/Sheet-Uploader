import {type SandboxedJob} from 'bullmq';
import {ExcelParser} from '../utils/excelParser.js';
import {createUploadJob} from '../utils/jobs.js';
import { batchUpload } from "../utils/batch.js";

export default async function(job: SandboxedJob){
    console.log('Worker started');
    const {filePath, originalName, size, mimeType} = job.data;
    console.time(`Processing file ${originalName}`);
    const parser = new ExcelParser();
    const data = await parser.extractData(filePath);
    const dbJob = await createUploadJob(originalName, data.length);
    await batchUpload(data, 1000, dbJob.id);
    console.timeEnd(`Processing file ${originalName}`);
}