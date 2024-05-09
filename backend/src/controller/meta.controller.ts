import { Request,Response } from "express";
import { getMetaData } from "../service/meta.service";

export const getData = (req:Request,res:Response) => {
    const result = getMetaData( );
    res.status(result.code).json(result.msg)
}

