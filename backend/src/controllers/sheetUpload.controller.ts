import type{ Request, Response, NextFunction } from "express";
import {ExcelParser} from "../utils/excelParser.js";
import { expectedHeadersSet, headersMap, headersDataMap } from "../common/constants.js";

export const parseFile = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const path = req.file?.path;
        if(!path){
            return res.status(404).json({message: 'File path not found'});
        }
        const parser = new ExcelParser(expectedHeadersSet, headersMap, headersDataMap);
        const headersPos = await parser.headersFinder(path);
        // console.log(headersPos);
        const data = await parser.extractData(path, headersMap);
        console.log(data.length);
        // data.forEach((val, key)=>{
        //     console.log(`Header: ${key}, Values: ${val.length}`);
        // })
        return res.status(200).json({message: 'File parsed successfully'});
    }catch(err){
        next(err);
    }
}