
const request = require('supertest');
const app = require('../app');

describe('Employee API', () => {
    it('should update employee information', async () => {
        const userInfo = {
            id: 1,
            // Add other required fields for updating employee information
        };

        const response = await request(app)
            .put('/adminApi/employee/employeeInfo')
            .send(userInfo);
        console.log('11111', response.status, response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({"code": 200, "data": "修政成功!", "message": "成功"});
    });
});