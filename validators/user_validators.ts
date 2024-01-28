/**
 * ========================================================================================
 * 这里 不仅仅是数据校验，因为使用了zod 这个校验库 ，可以直接将他导出成ts类型 供其他地方使用
 * ========================================================================================
 */

import { ZodError, string, z } from "zod";
import { Request, Response, NextFunction } from "express";

const login = z.object({
  username: z.string().min(2).max(32),
  password: z.string().min(1),
});

const addUser = z.object({
  id:z.string(),
  openid:z.string(),
  name:z.string().min(1),
  password:z.string().min(1),
  phone:z.string().min(1),
  sex:z.enum(['MAN','WOMAN','ET']),
  avatar:z.string(),
  city:z.string(),
  status:z.enum(['GENERAL_USER','ADMIN_USER','SUPER_ADMIN_USER']),
})

export type IAddUser = z.infer<typeof addUser>

export function validateLogin(req: Request, res:Response, next: NextFunction) {
  try {
    login.parse(req.body);
    next()
  } catch (error) {
    const zodError = error as ZodError;
    console.log(error);

    res.status(400).json(`登录参数有误${JSON.stringify(zodError)}`);
  }
}


export function validateAddUser(req: Request, res:Response, next: NextFunction) {
  try {
    addUser.parse(req.body);
    next()
  } catch (error) {
    const zodError = error as ZodError;
    res.status(400).json(`新增用户参数有误${JSON.stringify(zodError)}`);
  }
}

