import jwt from "jsonwebtoken";
import { decode } from "jsonwebtoken";

/**
 * 生成token
 * @param userInfo 需要返回的用户信息
 * */
export const sign = async (userInfo) => {
  return new Promise((resolve, reject) => {
    jwt.sign(userInfo, process.env.JWT_SECRET, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
};

/**
 * 解析token
 * @param token 前端返回的token
 * */
export const verifySign = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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
