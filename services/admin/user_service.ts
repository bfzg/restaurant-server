import DAO from "../../prisma/prisma";
import { IAddUser } from "../../validators/user_validators";

export async function GetUserinfo(username: string) {
  const dbRes = await DAO.user.findFirst({
    where: {
      name: username,
    },
  });
  return dbRes;
}

export async function AddUser(data: IAddUser) {
  const dbRes = await DAO.user.create({
    data: {
      ...data,
    },
  });
  return dbRes;
}
