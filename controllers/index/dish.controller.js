const Dish = require("../../models/dish")
const HttpException = require("../../exceptions/http.exceptions")
const Result = require('../../package/response/result_utils');
exports.getDishList = async (req, res) => {
    let dishList = await Dish.findAll();

    const message = Result.success(dishList)
    res.json(message)
}
