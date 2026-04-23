import { Employee } from "../models/employee.model.js";
// import type{ EmployeeData } from "../types/employee.type.js";
import {sequelize} from "../config/sequelize.js";

export async function batchUpload(data: any[], batchSize: number){
    const batches:any[] = [];
    for(let i=0; i<data.length; i+=batchSize){
        batches.push(data.slice(i, i+batchSize));
    }
    await sequelize.transaction(async (t)=>{
        for(const batch of batches){
            await Employee.bulkCreate(batch,{
                transaction: t,
                validate: true,
            });
        }
    })
}