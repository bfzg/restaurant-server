import { ZodError, z } from "zod";
import { Request, Response, NextFunction } from "express";

const login = z.object({
  username: z.string().min(2).max(32),
  password: z.string().min(1),
});

export function validateLogin(req: Request, res:Response, next: NextFunction) {
  try {
    login.parse(req.body);
    next()
  } catch (error) {
    const zodError = error as ZodError;
    console.log(error);

    res.status(400).json(`添加菜品数据校验失败${JSON.stringify(zodError)}`);
  }
}
