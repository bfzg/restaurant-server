import multer from "multer";
import uuid from "uuid";
 
export const adminStorage = multer.diskStorage({
  destination: function (req, files, cd) {
    cd(null, "./public/upload");
  },
  filename: function (req, file, cd) {
    let fileFormat = file.originalname.split("."); //取后缀
    //设置保存时的文件名，uuid+后缀
    cd(null, uuid() + "." + fileFormat[fileFormat.length - 1]);
  },
});

