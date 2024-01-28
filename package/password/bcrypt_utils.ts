import bcrypt from "bcrypt";

const SALT = 10;

//生成加密后的密码
export const hashPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encrypted) => {
      if (err) {
        reject(err);
      }
      resolve(encrypted);
    });
  });
};

/**
 * 校验密码
 * @param oldPwd 老密码
 * @param password 新密码
 * */
export const matchPassword = (oldPwd:string, password:string) => {
  return new Promise((resolve, _) => {
    let match = bcrypt.compare(password, oldPwd);
    resolve(match);
  });
};

//测试

async function test1() {
    const password = 'admin';
    const hashPwd = await hashPassword(password);
    console.log(hashPwd)
    // const matchpwd = await matchPassword(hashPwd,'zzz');
    // console.log(matchpwd)
}
test1();
