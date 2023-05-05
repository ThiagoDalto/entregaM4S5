import { Request, Response } from "express";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserUpdate } from "../../interfaces/users";
import userUpdateService from "../../services/user/userUpdate.service";

const userUpdateController = async (req: Request, res: Response) => {
  const user: IUserUpdate = req.body;
  const id: string = req.params.id;

  const bodyKeys = Object.keys(req.body);

  if (
    bodyKeys.includes("isActive") ||
    bodyKeys.includes("isAdm") ||
    bodyKeys.includes("id")
  ) {
    throw new AppError("Can not update this field", 401);
  }

  const updatedUser = await userUpdateService(user, id);
  const updatedUserNoPWD: any = { ...updatedUser };
  delete updatedUserNoPWD.password;

  return res.status(200).json(updatedUserNoPWD);
};

export default userUpdateController;
