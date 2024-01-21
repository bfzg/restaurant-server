const { Op } = require("sequelize");
const Dish = require("../../models/dish");
const DAO = require("../../dao/dao");
const Result = require("../../package/response/result_utils");
const moment = require("moment");

const { v4: uuidv4 } = require("uuid");

exports.makeOrder = async (req, res) => {
  let { dishIds, address, remark = "",playMethod,username } = req.body;
  if (!dishIds.length > 0 && !address && !playType) return res.json(Result.failed("下订单失败，参数有误"));
  const orderId = uuidv4(); // 使用v4版本的UUID生成唯一的订单号
  let order_data = {
    order_id: orderId,
    status: 1,   //待付款
    user_id:'',
    user_name:username,
    address:address,
    order_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    checkout:'',
    remark:remark,
    play_method:playMethod,
    play_status:0,
    total_price:_calcTotalPrice(dishIds),
  };

  console.log(">>>", order_data, dishIds);
  
};

//计算总价格
const _calcTotalPrice = async (dishIds) => {
  let total_price = 0;
  order_dish = [];
  for (let i = 0; i < dishIds.length; i++) {
    let dish = await DAO.findOne(Dish, { where: { id: dishIds[i] } });
    console.log('筛选出来的菜品',dish.dataValues);
    order_dish.push(dish.dataValues);
    total_price += Number(dish.price).toFixed(2);
  }
  return { order_dish, total_price };
};
