import { Employee } from "../models/employee.model.js";
// import type{ EmployeeData } from "../types/employee.type.js";
import {sequelize} from "../config/sequelize.js";


export async function batchUpload(data: any[], batchSize: number){
    const batches:any[] = [];
    console.time('Batch Separation Time');
    for(let i=0; i<data.length; i+=batchSize){
        batches.push(data.slice(i, i+batchSize));
    }
    console.timeEnd('Batch Separation Time');
    console.time('Batch Upload Time');
    await sequelize.transaction(async (t)=>{
        // await Promise.all(batches.map(batch=> Employee.bulkCreate(batch, {
        //     transaction: t, 
        //     validate: false, 
        //     returning: false,
        //     // logging: console.log
        // })));
        for(const batch of batches){
            await Employee.bulkCreate(batch, {
                transaction: t, 
                validate: false, 
                returning: false,
                // logging: console.log
            });
        }
    });
    console.timeEnd('Batch Upload Time');

}       