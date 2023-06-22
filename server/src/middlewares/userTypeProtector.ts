import { NextFunction, Request, Response } from "express";

interface CustomRequest extends Request {
  user: {
    userId: string;
    userEmail: string;
    lives_in: string;
  };
}
const userTypeProtector = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
  userTable: "clients" | "owners" | "chefs" | "waiters"
) => {
  const userLivesIn = req.user.lives_in;
  if (userLivesIn !== userTable) {
    return res
      .status(401)
      .json({ errorMessage: "you are not allowed to do this" });
  }
  next();
};

export default userTypeProtector;
