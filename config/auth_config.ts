/**
 * 用户的角色 
 * @param {string} role 
 * @returns 
 */

const permissions = (role:Auth)=>{
    const permissionConfig = {
        admin:[
            {path:'/adminApi/login',method:'post'},
            {path:'/adminApi/employee/save',method:'post'},
            {path:'/adminApi/employee/list',method:'get'},
            {path:'/adminApi/employee/status',method:'get'},
            {path:'/adminApi/employee/employeeInfo',method:'put'},
            {path:'/adminApi/employee/fine',method:'get'},
            {path:'/adminApi/dish/list',method:'get'},
            // {path:'/adminApi/employee/employeeInfo',method:'put'},
        ],
        user:[
            {path:'/adminApi/login',method:'post'},
        ]
    }

    //根据用户获取对应的权限列表
    const userPermissions = permissionConfig[role] || [];

    return userPermissions;
}

module.exports = permissions;