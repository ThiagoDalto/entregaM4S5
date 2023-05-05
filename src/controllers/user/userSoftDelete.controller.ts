import { Request, Response } from "express";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserUpdate } from "../../interfaces/users";
import userSoftDeleteService from "../../services/user/userSoftDelete.service";

const userSoftDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userSoftDeleteService(id);

    return res.status(204).send();
  } catch (error) {
    if (error instanceof AppError) {
      if (error.message.includes("User")) {
        return res.status(404).json({
          message: "Id invalid",
        });
      } else {
        return res.status(400).json({
          message: error.message,
        });
      }
    }
  }
};

export default userSoftDeleteController;
