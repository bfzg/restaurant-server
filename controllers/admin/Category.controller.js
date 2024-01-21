const Category = require('../../models/Category')
const Result = require('../../package/response/result_utils')
const DAO = require('../../dao/dao')
const { Op, where } = require('sequelize')

//新增分类
exports.createCategory = async (req, res) => {
    const reqData = req.body;
    const dbRes = await DAO.findOne(Category, {
        where: {
            name:reqData.name
        }
    })
    console.log(dbRes);
    if(dbRes) return res.json(Result.failed('该分类已存在!'));
    reqData.status = 0;
    await DAO.create(Category,reqData);
    res.json(Result.success('创建成功!'))
}

//修改分类 启用 禁用
exports.reviseCategoryStatus = async (req,res) =>{
    const {id,status} = req.body;
    const dbRes = await DAO.update(Category,{status:status},{where:{id}});
    if(dbRes != 1) return res.json(Result.failed('修改失败!'));
    res.json(Result.success('修改成功!'))
}

//修改分类
exports.reviseCategoryInfo = async (req,res) => {
    const reqData = req.body;
    const dbRes = await DAO.findOne(Category,{
        where:{
            id:reqData.id
        }
    })
    if(!dbRes) return res.json(Result.findOne('分类不存在!'));
    const dbRet = await DAO.update(Category,reqData,{where:{id:reqData.id}});
    console.log(dbRet);
    if(dbRet[0] != 1) return res.json(Result.failed('修改失败!'))
    res.json(Result.success('修改成功!'));
}

//分类分页查询
exports.getCategoryList = async (req,res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const type = req.query.type;
    const options = {
        offset:(page - 1) * pageSize,
        limit: pageSize,
        where: {
            status:1,
        }
    }

    if(type) options.where.type = type

    const dbRes = await DAO.findAndCountAll(Category,options);
    if (!dbRes) return res.json(Result.failed('没有该分类!'));
    const result = dbRes.rows;
    const total = dbRes.count;
    res.json(Result.success({ result, total }))
}