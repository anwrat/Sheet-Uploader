import type{ Request, Response, NextFunction } from "express";
import {ExcelParser} from "../utils/excelParser.js";
import { expectedHeadersSet, headersMap, headersDataMap } from "../common/constants.js";
import { batchUpload } from "../utils/batch.js";
import { createUploadJob, getUploadJobs} from "../utils/jobs.js";
import { dropEmployeeIndexes } from "../utils/dropAllIndexes.js";

export const parseFile = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const path = req.file?.path;
        if(!path){
            return res.status(404).json({message: 'File path not found'});
        }
        console.log('Filename: ', req.file?.originalname);
        console.time('File parsing time');
        const parser = new ExcelParser(expectedHeadersSet, headersMap, headersDataMap);
        const headersPos = await parser.headersFinder(path);
        // console.log(headersPos);
        const data = await parser.extractData(path, headersMap);
        console.timeEnd('File parsing time');
        console.log(data.length);
        const job = await createUploadJob(req.file?.originalname!, data.length);
        // data.forEach((val, key)=>{
        //     console.log(`Header: ${key}, Values: ${val.length}`);
        // })
        // await dropEmployeeIndexes();
        await batchUpload(data, 1000, job.id);
        return res.status(200).json({message: 'File parsed successfully'});
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

// export const updateUploadJobbyId = async(req: Request, res: Response, next: NextFunction)=>{
//     try{
//         const jobId = parseInt(req.params.jobId as string);
//         const {status, processedRows, errorMessage} = req.body;
//         await updateUploadJob(jobId, status, processedRows, errorMessage);
//         return res.status(200).json({message: 'Job updated successfully'});
//     }catch(err){
//         next(err);
//     }
// }
