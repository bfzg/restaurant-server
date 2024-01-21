import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors  from 'cors';
import express from 'express';

import initServer from './init/initServer';

import adminRouter from './routes/admin_api';
import indexRouter from './routes/index_api';

// 404 和 错误处理
import noMatchMiddleware from './middleware/404_middleware';
import errorMiddleware from './middleware/error_middleware';

// 权限校验
// import { authMiddleware } from './middleware/admin/auth.middleware';


const app = express();

// 配置 env
dotenv.config();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 配置跨域
app.use(
    cors({
      credentials: true,
      origin: true,
    })
); // TODO 这里需要进行详细配置
app.use(logger('tiny')); // http 请求日志
app.use(express.json()); // 处理请求参数解析
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 权限接口校验
// app.use(authMiddleware);
app.use('/',indexRouter)
app.use('/admin',adminRouter)

// 处理无响应 如果没有路径处理就返回 Not Found
app.use(noMatchMiddleware);

// 错误处理
app.use(errorMiddleware);

const main = async () => {
  await initServer(app); // 初始化服务器
};

main();

export default app;
