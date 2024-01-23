import jwt from "jsonwebtoken";
import { decode } from "jsonwebtoken";

const jwt_secret = String(process.env.JWT_SECRET)

/**
 * 生成token
 * @param userInfo 需要返回的用户信息
 * */
export const sign = async (userInfo:any) => {
  return new Promise((resolve, reject) => {
    jwt.sign(userInfo, jwt_secret, (err:any, token:any) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
};

/**
 * 解析token
 * @param token 前端返回的token
 * */
export const verifySign = async (token:any) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwt_secret, (err:any, decoded:any) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
};

//test
// const test = async ()=>{
//     const userInfo = {
//         username:'张三',
//         email:'fdshuai@qq.com'
//     }
//     const token  = await sign(userInfo);
//     console.log(token);
//     const decoded = await decode(token);
//     console.log(decoded)
// }
// test();
