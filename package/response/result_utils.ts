import { Response } from "express";
/**
 * 统一响应 返回结果
 * @param code 状态码
 * @param message 描述信息
 * @param data 数据
 * */
export default function Result<T>(res: Response, code, message: string, data:T) {
  return res.status(400).json({ error: true, message,data });
}
