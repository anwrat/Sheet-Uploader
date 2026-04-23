import { Employee } from "../models/employee.model.js";

export async function batchUpload(data: Employee[], batchSize: number){
    const batches = [];
    for(let i=0; i<data.length; i+=batchSize){
        batches.push(data.slice(i, i+batchSize));
    }
}