import { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/userRepository";
import { createJWT } from "../utils/token";
import { compareTwoPasswords } from "../utils/password";
import restaurantRepository from "../repositories/restaurantRepository";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, user_type } = req.body;
    const user = await UserRepository.createUser({
      name,
      email,
      password,
      user_type,
    });
    if (user_type === "restaurant_owner") {
      await restaurantRepository.createRestaurant({ name, owner_id: user.id });
    }
    const token = createJWT(user.id.toString(), user.email, user.user_type);
    return res.status(200).json({ res: token });
  } catch (err) {
    next(err);
  }
};

const singin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await UserRepository.getUserByQuery({ email });

    if (!user) {
      throw Error("invalid credentials");
    }

    const isValidPassword = await compareTwoPasswords(password, user.password);

    if (!isValidPassword) {
      throw Error("invalid credentials");
    }

    const token = createJWT(user.id.toString(), user.email, user.user_type);
    return res.status(200).json({ res: token });
  } catch (err) {
    next(err);
  }
};

const userControllers = { singin, signup };
export default userControllers;