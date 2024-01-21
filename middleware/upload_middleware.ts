import multer from "multer";
import { NextFunction, Request, Response } from "express";
import moment from "moment";

const uploadFile = (uploadPath: string,fieldName:string) => {
  const storage = multer.diskStorage({
    destination: (req, file, cd) => {
      cd(null, uploadPath);
    },
    filename: (req, file, cd) => {
      const uniqueSuffix = moment().format("YYYYMMDDHHmmss");
      cd(null, file.fieldname + "-" + uniqueSuffix);
    },
  });
  const upload = multer({ storage });
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await new Promise<void>((resolve, reject) => {
        upload.single(fieldName)(req, res, (error: any) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
      if(!req.file){
        throw new Error('No file uploaded');
      }
      const filePath = req.file.path; // 获取上传后的文件路径

      res.locals.filePath = filePath; // 将文件路径保存到 response.locals 中，供后续处理使用
      next()
    } catch (error:any) {
      res.status(400).json({ error: true, message: error.message });
    }
  };
};


export default uploadFile;