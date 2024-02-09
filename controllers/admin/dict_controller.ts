import { Request, Response } from "express";
import {IAddDict} from "../../validators/dict_validator"
import {AddDictType} from "../../services/admin/dict_services"
import Result from "../../package/response/result_utils"

export const createDictType = (req:Request,res:Response) =>{
  const reqData = req.body;
  AddDictType(reqData).then(response=>{
    Result(res,response.code,response)
  })
}