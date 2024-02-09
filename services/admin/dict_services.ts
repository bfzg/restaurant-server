import {IAddDict} from "../../validators/dict_validator"
import type {QueryPagination} from "../../typings/global"
import DAO from "../../prisma/prisma"

export async function FindDictType(page:number,size:number) {
    const skip = (page - 1) * size!;
    const take = size!;
    const findRes = await DAO.dict_Types.findMany({
        skip,
        take,
    })
    const total = await DAO.dict_Types.count({})
    return {data:findRes,total:total}
}

export async function AddDictType(data:IAddDict){
    const findRes = await DAO.dict_Types.findFirst({
        where:{
           OR:[
            {
                name:{contains:data.name}
            },
            {
                code:{contains:data.code}
            }
           ]
        }
    })
    if(findRes) return {code:400,msg:'name或者code编码已存在'}
    const addRes = await DAO.dict_Types.create({
        data:{
            code:data.code,
            name:data.name,
            is_default:true    //这里默认是开启的
        }
    })
    return {code:200,msg:'添加成功!',data:addRes}
}