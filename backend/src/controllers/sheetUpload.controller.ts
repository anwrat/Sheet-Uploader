import type{ Request, Response, NextFunction } from "express";
import {ExcelParser} from "../utils/excelParser.js";
import { batchUpload } from "../utils/batch.js";
import { createUploadJob, getUploadJobs} from "../utils/jobs.js";
import {uploadQueue} from '../queues/queues.js';
import path from 'path';
// import { dropEmployeeIndexes } from "../utils/dropAllIndexes.js";

// export const parseFile = async(req: Request, res: Response, next: NextFunction)=>{
//     try{
//         console.time('Check time before headers finder');
//         const path = req.file?.path;
//         if(!path){
//             return res.status(404).json({message: 'File path not found'});
//         }
//         console.log('Filename: ', req.file?.originalname);
//         console.time('File parsing time');
//         const parser = new ExcelParser();
//         console.timeEnd('Check time before headers finder');
//         const data = await parser.extractData(path);
//         // console.log(headersPos);
//         console.timeEnd('File parsing time');
//         console.log(data.length);
//         console.log("Creating upload job for ", req.file?.originalname);
//         const job = await createUploadJob(req.file?.originalname!, data.length);
//         // data.forEach((val, key)=>{
//         //     console.log(`Header: ${key}, Values: ${val.length}`);
//         // })
//         // await dropEmployeeIndexes();
//         console.time('Batch Upload Time');
//         await batchUpload(data, 1000, job.id);
//         console.timeEnd('Batch Upload Time');
//         return res.status(200).json({message: 'File parsed successfully'});
//     }catch(err){
//         next(err);
//     }
// }
export const parseFile = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {uploadUrl, originalName, size, mimeType} = req.body;
        const tusId = uploadUrl.split("/").pop();
        if (!tusId) {
        return res.status(400).json({
            message: "Invalid upload URL",
        });
        }
        const filePath = path.resolve('uploads', tusId);
        await uploadQueue.add('upload-queue',{
            filePath, 
            originalName,
            size,
            mimeType,
        },
        {
            removeOnComplete: true,
            removeOnFail: true,
        }
    );   
        return res.status(200).json({message: 'File sent to upload queue'});
    }catch(err){
        next(err);
    }
}

export const getAllUploadJobs = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const job = await getUploadJobs();
        return res.status(200).json({job});
    }catch(err){
        next(err);
    }
}
