import type{ Request, Response, NextFunction } from "express";

export default function catchAsync(fn){
    return function (req: Request, res: Response, next: NextFunction){
        Promise.resolve(fn(req,res,next));
    }
}