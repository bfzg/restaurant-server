import {Application} from "express";

/**
 * 初始化服务器
 * */
const initServer = async (app:Application) => {
    return new Promise((resolve, reject) => {
        const PORT = process.env.DEV_PORT || 3333;
        app
            .listen(PORT, () => {
                console.log(`服务器运行在 http://${process.env.DEV_HOST}:${PORT}`);
                resolve('success');
            })
            .on('error', (error) => {
                console.log(error);
                reject();
            })
    })
}

export default initServer;