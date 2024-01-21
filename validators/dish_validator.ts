import { ZodError, z } from "zod";
import { Request, Response,NextFunction } from "express";

const add = z.object({
  name: z.string().min(1).max(128),
  status: z.boolean(),
  price: z.number().min(0),
  old_price: z.number(),
  spec: z.string(),
  category_id: z.string(),
  description: z.string(),
  tag: z.string(),
  month_saled: z.number(),
});

export function validateAddDish(req:Request, res:Response, next:NextFunction) {
  try {
    const dishData = req.body;
    add.parse(dishData);
    next();
  } catch (error) {
    const zodError = error as ZodError;
    console.log(error);
    
    res.status(400).json(`添加菜品数据校验失败${JSON.stringify(zodError)}`)
  }
}
