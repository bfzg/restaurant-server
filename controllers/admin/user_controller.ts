import moment from 'moment'
//生成 解析 token 解析密码
import {sign} from '../../package/password/jwt.utils';
import {matchPassword, hashPassword} from '../../package/password/bcrypt_utils'
import {Response,Request} from 'express'
import { AddUser, GetUserinfo } from '../../services/admin/user_service';
import { IAddUser } from "../../validators/user_validators";
import Result from "../../package/response/result_utils"

//登录
export const login = async (req:Request, res:Response) => {
    let username = req.body.username;
    let password = req.body.password;

    const dbRes = await GetUserinfo(username)

    if (!dbRes) return res.status(400).json('该用户不存在')
    if (!await matchPassword(dbRes.password, password)) return res.status(400).json('密码错误!')
    let userInfo = {
        id: dbRes.id,
        name: dbRes.name,
        phone: dbRes.phone,
        sex: dbRes.sex,
        create_user: dbRes.createdAt,
        update_time: dbRes.updatedAt,
    }
    let token = await sign(userInfo)
    res.status(200).json(token)
}


//创建员工
export const createUser = async (req:Request<any,any,IAddUser>, res:Response) => {
    const reqInfo = req.body;
    const findRes = await GetUserinfo(reqInfo.name)
    if (findRes) return Result<string>(res,400,'该用户名已存在!')
    let userInfo = Object.assign({}, reqInfo);
    userInfo.password = await hashPassword(reqInfo.password); //默认密码 可以在编辑中修改!
    const addRes = AddUser(userInfo).then(response=>{
        if (!response) return Result<string>(res,400,'创建用户失败!')
        return Result(res,200,response)
    })
}

// //获取员工列表
// exports.getEmployeeList = async (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const pageSize = parseInt(req.query.pageSize) || 10;
//     const options = {
//         offset: (page - 1) * pageSize,
//         limit: pageSize,
//         attributes: {exclude: ['password']}
//     }

//     try {
//         let dbRes = await DAO.findAndCountAll(Employee, options);
//         if (!dbRes) return res.json(Result.failed('没有员工列表!'));
//         const result = dbRes.rows;
//         const total = dbRes.count;
//         res.json(Result.success({result, total}))
//     } catch (error) {
//         throw error;
//     }
// }

// //修改员工启用 禁用
// exports.reviseEmployeeStatus = async (req,res) => {
//     console.log(req.body);
//     let {id,status} = req.body;
//     let dbRes = await DAO.update(Employee, {status:status},{where:{id}},);
//     console.log(dbRes)
//     if (dbRes != 1) return res.json(Result.failed('修改失败!'));
//     //TODO 编写用户权限校验中间件
//     res.json(Result.success('修改成功!'));
// }

// //编辑用户信息
// exports.reviseEmployeeInfo = async (req,res) => {
//     let userInfo = req.body;
//     userInfo.update_time = moment().format('YYYY-MM-DD HH:mm:ss');
//     let dbRes = await DAO.update(Employee, userInfo,{where:{id:userInfo.id}});
//     if (dbRes != 1) return res.json(Result.failed('修改失败!'));
//     res.json(Result.success('修政成功!'));
// }

// //根据姓名查找员工
// exports.findEmployee = async (req,res) => {
//     console.log(req.query)
//     let {name} = req.query;
//     let dbRes = await DAO.findAll(Employee,{where:{
//           [Op.or]:{
//               name:{
//                   [Op.like]:`%${name}%`
//               },
//               username:{
//                   [Op.like]:`%${name}%`
//               }
//           }
//         },
//         attributes: {exclude: ['password']}
//     });
//     if (dbRes.length === 0) return res.json(Result.recordNotFound('暂无数据!'));
//     res.json(Result.success(dbRes));
// }