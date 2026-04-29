import { Employee } from "../models/employee.model.js";
import { Job } from "../models/job.model.js";
// import type{ EmployeeData } from "../types/employee.type.js";
import {sequelize} from "../config/sequelize.js";


export async function batchUpload(data: any[], batchSize: number, jobId: number){
    const batches:any[] = [];
    console.time('Batch Separation Time');
    for(let i=0; i<data.length; i+=batchSize){
        batches.push(data.slice(i, i+batchSize));
    }
    console.timeEnd('Batch Separation Time');
    console.time('Batch Upload Time');
    let processedRows = 0;
    try{
        await sequelize.transaction(async(t)=>{
            for (const batch of batches){
                await Employee.bulkCreate(batch,{
                    transaction: t,
                    validate: false,
                    returning: false,
                });
                processedRows += batch.length;
                await Job.update({
                    processedRows: processedRows
                },{
                    where: {id: jobId},
                    transaction: null,
                });
            }
        });
        await Job.update({
            status: 'completed',
            processedRows: data.length
        },{
            where: {id: jobId}
        });
        console.timeEnd('Batch Upload Time');
    }
    catch(err){
        await Job.update({
            status: 'failed',
            errorMessage: (err as Error).message
        },{
            where: {id: jobId}
        });
        console.error('Batch upload failed: ', err);
    }
}       