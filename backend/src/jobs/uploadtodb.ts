// import {type SandboxedJob} from 'bullmq';
// import {ExcelParser} from '../utils/excelParser.js';
// import {createUploadJob} from '../utils/jobs.js';
// import { batchUpload } from "../utils/batch.js";

// export default async function(job: SandboxedJob){
//     console.log('Worker started');
//     const {filePath, originalName, size, mimeType} = job.data;
//     console.time(`Processing file ${originalName}`);
//     const parser = new ExcelParser();
//     const data = await parser.extractData(filePath);
//     const dbJob = await createUploadJob(originalName, data.length);
//     await batchUpload(data, 1000, dbJob.id);
//     console.timeEnd(`Processing file ${originalName}`);
// }

import {type SandboxedJob} from 'bullmq';
import {ExcelParser} from '../utils/excelParser.js';
import { Job } from "../models/job.model.js";
import {createUploadJob} from '../utils/jobs.js';
import { batchUpload } from "../utils/batch.js";

export default async function(job: SandboxedJob){
    console.log('Worker started');
    const {filePath, originalName, size, mimeType} = job.data;
    console.time(`Processing file ${originalName}`);
    try{
        const parser = new ExcelParser();
        const data = await parser.extractData(filePath);
        const existingJob = await Job.findOne({
            where:{
                fileName: originalName,
            }
        });
        if(!existingJob){
            const dbJob = await createUploadJob(originalName, data.length);
            await batchUpload(data, 1000, dbJob.id, 0);
        }else{
            if(existingJob.status === 'completed'){
                return {message: 'File already uploaded before'};
            }
            const remainingData = data.slice(existingJob.processedRows);
            await batchUpload(remainingData, 1000, existingJob.id, existingJob.processedRows);
        }
        console.timeEnd(`Processing file ${originalName}`);
    }catch(err){
        console.error(err);
    }
}