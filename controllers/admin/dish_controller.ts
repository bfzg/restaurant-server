import { v4 } from 'uuid';
import moment from "moment";
import DAO from "../../prisma/prisma";
import { Request, Response } from "express";
import type { DishListRes } from "../../typings/dish.d.ts";
//获取菜品列表
export const getDishList = async (req: Request, res: Response) => {
  const reqQuery: DishListRes = req.query;
  const page = reqQuery.page || 1;
  const size = reqQuery.size || 10;
  const query = reqQuery.query || "";
  const skip = (page - 1) * size;
  const take = size;
  let dbRes = await DAO.dish.findMany({
    skip,
    take,
    where: {
      OR: [{ name: { contains: query } }, { description: { contains: query } }],
    },
  });
  const total = await DAO.dish.count({
    where: {
      OR: [{ name: { contains: query } }, { description: { contains: query } }],
    },
  });
  if (!total) return res.status(304).json("没有菜品!");
  res.status(200).json({ dbRes, total })
};

//创建菜品
export const createDish = async (req: Request, res: Response) => {
  const reqData = req.body;
  const filePath = res.locals;
  console.log(filePath);
  
  if (typeof reqData.image == "object") {
    reqData.image = JSON.stringify(reqData.image);
  }

  let dbRes = await DAO.dish.findFirst({
    where: {
      name: reqData.name,
    },
  });
  
  if (dbRes) {
    console.log(dbRes);
    return res.status(400).json("菜名重复!");
  }
  let dishData = Object.assign({id:v4()}, reqData);  
  console.log(dishData);
  
  const createDbReq = await DAO.dish.create({
    data: dishData,
  });
  res.status(200).json("添加成功!");
};
// //修改菜品信息
// export const reviseDishInfo = async (req, res) => {
//     const reqData = req.body;
//     console.log(reqData.id);
//     let dbRes = await DAO.findOne(Dish, {
//         where: {
//             id: reqData.id,
//         },
//     });
//     if (!dbRes) return res.json("没有该菜品请添加!");
//     let flavorsData = Object.assign({}, reqData.flavors);
//     delete reqData.flavors;
//     let dishData = Object.assign({}, reqData);
//     let dbRet = await DAO.update(
//         Dish,
//         {...dishData},
//         {where: {id: dishData.id}}
//     );
//     if (dbRet !== 1 && dbRen !== 1) return res.json(Result.failed("修改失败!"));
//     res.json(Result.success("修改成功!"));
// };
//
// //修改菜品 起售 停售
// export const reviseDishStatus = async (req, res) => {
//     const {id, status} = req.body;
//     const dbRes = await DAO.update(Dish, {status: status}, {where: {id}});
//     if (dbRes != 1) return res.json(Result.failed("修改失败!"));
//     res.json(Result.success("修改成功!"));
// };
//
// //批量删除 菜品
// export const deleteDish = async (req, res) => {
//     const {ids} = req.body;
//     console.log(ids);
//     let dbRes = await DAO.delete(Dish, ids);
//     if (dbRes == 0) return res.json(Result.failed("没有该菜品!"));
//     res.json(Result.success("删除成功!"));
// };
//
// //根据菜品查找菜品
// export const findDish = async (req, res) => {
//     const {name} = req.query;
//     const dbRes = await DAO.findAll(Dish, {
//         where: {
//             [Op.or]: {
//                 name: {
//                     [Op.like]: `%${name}%`,
//                 },
//                 description: {
//                     [Op.like]: `%${name}%`,
//                 },
//             },
//         },
//     });
//     if (dbRes.length == 0) return res.json(Result.recordNotFound("暂无数据!"));
//     res.json(Result.success(dbRes));
// };
