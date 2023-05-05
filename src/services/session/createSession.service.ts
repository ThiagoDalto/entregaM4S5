import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/users";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../../errors/appError";

const createSessionService = async ({ email, password }: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const account = users.find((user) => user.email === email);
  if (!account) {
    throw new AppError("Invalid user or password", 401);
  }
  const passwordMatch = await compare(password, account.password);

  if (!passwordMatch) {
    throw new AppError("Invalid user or password", 401);
  }

  const token = jwt.sign(
    {
      isAdm: account.isAdm,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: account.id,
    }
  );
  return token;
};

export default createSessionService;
