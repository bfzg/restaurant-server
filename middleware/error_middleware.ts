import type {Request, Response} from 'express';
import Result from "../package/response/result_utils"

/**
 * 统一错误处理
 * @param error 错误对象
 * @param req
 * @param res
 * @param next 放行
 * */

const error_middleware = (error:any, _:Request, res:Response) => {
    const status = error.status || 500;
    const message = error.message || '服务器错误';
    //error 是 HttpRequestError 的实例
    const errors = error.errors || '服务器错误';
    Result(res,status,{msg:message,error:errors})
}

export default error_middleware;