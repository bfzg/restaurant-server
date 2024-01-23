import DAO from '../../prisma/prisma'
export async function GetUserinfo (username:string){
    let dbRes = await DAO.user.findFirst({
        where: {
            name: username,
        },
    })
    return dbRes
}