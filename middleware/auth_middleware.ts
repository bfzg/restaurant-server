import { NextFunction,Request,Response } from 'express';
import {verifySign} from '../package/password/jwt.utils';
// import permissions from '../../config/auth.config'

//用户权限校验中间件
exports.authMiddleware = (req:Request,res:Response,next:NextFunction) => {
    console.log('权限校验',req,res);
    const token = req.headers.authorization;
    if(!token) return res.status(401).json('用户未登录!');
    try {
        const user = verifySign(token);
        req.user = user;
        const path = req.path;
        const method = req.method;
        //根据不同用户的角色和权限 判断是否可以访问该接口
        const isAllowed = checkPermission(user.role,user.permissios,path,method);
        if(!isAllowed) return res.status(403).json('权限不足!');
        next();
    } catch (error) {
        return res.status(404).json('无效token!');
    }

}


/**
 * @param role 用户的角色 如admin user
 * @param permissions 用户的权限 可以访问的接口
 * @param path 请求的路径
 * @param method 请求方式 如GET POST
 * */
const checkPermission = (role, permissions, path, method) => {
   const userPermissions = permissions(role)

   if(role === 'admin') return true;

   const allowed = userPermissions.some((permissions)=>{
    return permissions.path === path && permissions.method === method;
   });
   return allowed;
};