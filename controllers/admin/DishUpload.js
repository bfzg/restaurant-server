const Result = require('../../package/response/result_utils')


exports.dishUploadCallback = (req,res,next)=>{
    console.log('上传成功后回调',req.file);
    res.json(Result.success(req.file.path))
}