import DAO from "../../prisma/prisma"
import {IAddDict} from "../../validators/dict_validator"

export async function AddDictType(data:IAddDict){
    console.log(`============ ${data} ===========`);
    
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