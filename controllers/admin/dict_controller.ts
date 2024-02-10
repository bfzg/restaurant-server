import { Request, Response } from "express";
import {IAddDict, IAddDictType} from "../../validators/dict_validator"
import {AddDict, AddDictType,FindDictType} from "../../services/admin/dict_services"
import Result from "../../package/response/result_utils"
import type {QueryPagination} from "../../typings/global"

export const findDictType = (req:Request,res:Response)=>{
  const reqQuery:QueryPagination = req.query;
  const page = Number(reqQuery.page) || 1;
  const size = Number(reqQuery.size)|| 10;
  FindDictType(page,size).then(response=>{
    Result(res,200,response)
  }).catch(err=>{
    Result(res,500,err)
  })
}

export const createDictType = (req:Request,res:Response) =>{
  const reqData:IAddDictType = req.body;
  AddDictType(reqData).then(response=>{
    Result(res,response.code,response)
  }).catch(err=>{
    Result(res,500,err)
  })
}


export const createDict = (req:Request,res:Response) => {
  const reqData:IAddDict = req.body;
  AddDict(reqData).then(response=>{
    Result(res,response.code,response)
  }).catch(err=>{
    Result(res,500,err)
  })
}