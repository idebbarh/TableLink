import { NextFunction, Request, Response } from "express";
import { query } from "../database/mysql";

interface CustomRequest extends Request {
  user: {
    userId: string;
    userEmail: string;
    userType: string;
  };
}

const userTypeProtector = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
  userTable: "clients" | "owners" | "chefs" | "waiters"
) => {
  const user = await query("select * from ?", [userTable]);
  if (!user) {
    return res.status(401).json({ err: "you are not allowed to do this" });
  }
  next();
};

export default userTypeProtector;
