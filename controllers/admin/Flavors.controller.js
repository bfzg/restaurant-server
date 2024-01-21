const DishFlavors = require('../../models/dishFlavors')
const Result = require('../../package/response/result_utils')
const DAO = require('../../dao/dao')

//获取口味列表
exports.getDishFlavorsList = async (req,res)=>{
    let dbRes = await DAO.findAndCountAll(DishFlavors)
    if (!dbRes) return res.json(Result.failed('暂无口味!'))
    const result = dbRes.rows
    res.json(Result.success({ result }))
}