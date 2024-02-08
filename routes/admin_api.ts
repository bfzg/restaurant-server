import express from "express";
const router = express.Router();
import { createUser, login } from "../controllers/admin/user_controller";
import { getDishList, createDish } from "../controllers/admin/dish_controller";
import { validateAddDish } from "../validators/dish_validator";
import { validateAddUser, validateLogin } from "../validators/user_validators";
import {createDictType} from "../controllers/admin/dict_controller"
// const {getCategoryList,reviseCategoryInfo,reviseCategoryStatus,createCategory} = require('../controllers/admin/Category.controller')
// const {getDishFlavorsList} = require('../controllers/admin/Flavors.controller')
// const {dishUploadCallback} = require('../controllers/admin/DishUpload')
// const multer = require('multer')
// const uuid = require('uuid')
import uploadFile from "../middleware/upload_middleware";

/**
 * 用户api
 * */
router.post("/login", validateLogin, login);
router.post("/user/save", validateAddUser, createUser);
// router.get('/employee/list', getEmployeeList)
// router.post('/employee/status',reviseEmployeeStatus)
// router.put('/employee/employeeInfo',reviseEmployeeInfo)
// router.get('/employee/fine',findEmployee)

/**
 * 菜品api
 * */
router.get("/dish/list", getDishList);
router.post(
  "/dish/save",
  validateAddDish,
  uploadFile("./public/upload", "image"),
  createDish
);
// router.put('/dish/dishInfo',reviseDishInfo)
// router.post('/dish/status',reviseDishStatus)
// router.delete('/dish/delete',deleteDish)
// router.get('/dish/fine',findDish)

/**
 * 字典api
 */
router.post("/dictType/add",createDictType)


/**
 * 菜品口味api
 */
// router.get('/dishFlavor/list',getDishFlavorsList)

/**
 * 分类api
 */
// router.post('/category/save',createCategory)
// router.post('/category/status',reviseCategoryStatus)
// router.put('/category/categoryInfo',reviseCategoryInfo)
// router.get('/category/list',getCategoryList)

/**
 * 上传api
 */
// const adminStorage = multer.diskStorage({
//     destination:function(req,files,cd){
//         cd(null,'./public/upload')
//     },
//     filename:function(req,file,cd){
//         let fileFormat = (file.originalname).split('.') //取后缀
//         //设置保存时的文件名，uuid+后缀
//         cd(null,file.originalname)
//     }
// })
// const dishUpload = multer({ storage: adminStorage })
// router.post('/dish/upload',dishUpload.single('file'),dishUploadCallback)

export default router;
