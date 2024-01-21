import {Request, Response, } from 'express';

const noMatchMiddleware = (_:Request, res:Response) => {
    res.status(404).json({
        message: 'Not Found,路由不存在'
    })
}

export default noMatchMiddleware;