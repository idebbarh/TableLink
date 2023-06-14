import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token";

interface UserInfoFromToken {
  userId: string;
  userEmail: string;
  lives_in: string;
}

interface CustomRequest extends Request {
  user?: {
    userId: string;
    userEmail: string;
    lives_in: string;
  };
}
const globalProtector = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const bearer: string | undefined = req.headers.authorization;
  if (!bearer) {
    return res.status(401).json({ err: "not auth" });
  }
  const [_bearer, token] = bearer.split(" ");
  if (!_bearer || !token) {
    return res.status(401).json({ err: "invalid token" });
  }
  try {
    const decoded = verifyToken(token) as UserInfoFromToken;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ err: "invalid token" });
  }
};

export default globalProtector;
