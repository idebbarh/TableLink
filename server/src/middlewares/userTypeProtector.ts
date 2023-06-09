import { NextFunction, Request, Response } from "express";

interface CustomRequest extends Request {
  user: {
    userId: string;
    userEmail: string;
    userType: string;
  };
}

const userTypeProtector = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
  type: string
) => {
  const userType = req.user.userType;
  if (userType !== type) {
    return res.status(401).json({ err: "you are not allowed to do this" });
  }
  next();
};

export default userTypeProtector;
