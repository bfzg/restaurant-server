
const request = require('supertest')
const app = request('../app.ts')

describe('Dish API',()=>{
    it('should update dish createDish', async ()=>{
        const reqData = {
            "category_id": "1",
            "description": "香辣鸡腿，香酥可口",
            "flavors":{
                "dish_id": "1",
                "name": "香辣",
                "value": "辣"
            },
            "image": "",
            "name": "香辣鸡腿",
            "price": "13.7",
            "status": "1"
        }

        const response = await request(app)
        .post('/adminApi/dish/save')
        .send(reqData);
        console.log("🚀 ~ file: Dish.test.js:22 ~ it ~ response:", response.status)
        console.log("🚀 ~ file: Dish.test.js:22 ~ it ~ response:", response.body)
        

    })
})