import type{ Request, Response, NextFunction } from "express";
import { excelParser } from "../utils/excelParser.js";
import { manageData } from "../utils/manageData.js";

export const parseFile = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const path = req.file?.path;
        if(!path){
            return res.status(404).json({message: 'File path not found'});
        }
        const data = await excelParser(path);
        // console.log(data);
        const check = await manageData(data);
        console.log(check);
        return res.status(200).json({message: 'File parsed successfully'});
    }catch(err){
        next(err);
    }
}