import { ZodError, z } from "zod";
import { Request, Response,NextFunction } from "express";
import Result from "../package/response/result_utils"

const addDictType = z.object({
    code:z.string().min(1).max(128),
    name:z.string().min(1).max(128)
})

export type IAddDictType = z.infer<typeof addDictType>

export function validateAddDictType(req:Request,res:Response,next:NextFunction){
    try{
        const dictData = req.body;
        addDictType.parse(dictData)
        next()
    } catch (error){
        const zodError = error as ZodError;
        Result(res,400,{msg:`添加字典类型数据校验失败${JSON.stringify(zodError)}`})
    }
}

const addDict = z.object({
    label:z.string().min(1),
    value:z.string().min(1),
    sort:z.number(),    
    remark:z.string(),
    enabled:z.boolean(),
    code:z.string().min(1),
    flag:z.string()
})

export type IAddDict = z.infer<typeof addDict>

export async function validateAddDict (req:Request,res:Response,next:NextFunction) {
    try{
        const dictData = req.body;
        addDict.parse(dictData)
        next()
    } catch (error){
        const zodError = error as ZodError;
        Result(res,400,{msg:`添加字典数据校验失败${JSON.stringify(zodError)}`})
    }
}