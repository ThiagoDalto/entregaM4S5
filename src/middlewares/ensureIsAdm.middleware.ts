import { Request, Response, NextFunction } from "express";

const ensureIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isAdm } = req.user;

  if (!isAdm) {
    return res.status(403).json({
      message: "User is not admin",
    });
  }

  return next();
};

export default ensureIsAdmMiddleware;
