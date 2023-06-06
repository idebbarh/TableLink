import { Request, Response } from "express";

const singin = async (req: Request, res: Response): Promise<void> => {};
const signup = async (req: Request, res: Response): Promise<void> => {};

const userControllers = { singin, signup };
export default userControllers;
