import { Job } from "../models/job.model.js";

export async function createUploadJob(fileName: string, totalRows: number){
    const job = await Job.create({
        fileName: fileName,
        totalRows: totalRows,
    });
    return job;
}

export async function getUploadJobs(){
    const job = await Job.findAll();
    return job;
}

// export async function updateUploadJob(jobId: number,status?: string, processedRows?: number, errorMessage?: string){
//     const job = await Job.findByPk(jobId);
//     if(!job){
//         throw new Error('Upload job not found');
//     }
//     const updateData: any = {};
//     if(status) updateData['status'] = status;
//     if(processedRows) updateData['processedRows'] = processedRows;
//     if(errorMessage) updateData['errorMessage'] = errorMessage;
//     await job.update(updateData,{
//         where:{id: jobId}
//     });
// }