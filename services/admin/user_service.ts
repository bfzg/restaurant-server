import DAO from '../../prisma/prisma'
export async function GetUserinfo (username:string,password:string){
    let dbRes = await DAO.user.findFirst({
        where: {
            name: username,
        },
    })
    return dbRes
}