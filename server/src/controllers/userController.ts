import { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/userRepository";
import { createJWT } from "../utils/token";
import { compareTwoPasswords } from "../utils/password";
import { UserModel } from "../models/userModel";
import executeMethodsWithTransaction from "../utils/transaction";
import RestaurantRepository from "../repositories/restaurantRepository";
import { RestaurantModel } from "../models/restaurantModel";

class UserControllers {
  static async signup(req: Request, res: Response, next: NextFunction) {
    let user: UserModel;
    try {
      const { name, email, password, user_type } = req.body;
      if (user_type === "restaurant_owner") {
        console.log(user_type);
        const userWithRestaurant = (await executeMethodsWithTransaction(
          [
            () =>
              UserRepository.createUser({ name, email, password, user_type }),
            (id: number) =>
              RestaurantRepository.createRestaurant({
                name,
                owner_id: id,
              }),
          ],

          { from: 0, to: 1 }
        )) as [UserModel, RestaurantModel];
        user = userWithRestaurant[0];
      } else {
        user = await UserRepository.createUser({
          name,
          email,
          password,
          user_type,
        });
      }
      const token = createJWT(user.id.toString(), user.email, user.user_type);
      return res.status(200).json({ res: token });
    } catch (err) {
      next(err);
    }
  }

  static async singin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await UserRepository.getUserByQuery({ email });
      console.log(user);

      if (!user) {
        throw Error("invalid credentials");
      }

      const isValidPassword = await compareTwoPasswords(
        password,
        user.password
      );

      console.log(isValidPassword);
      if (!isValidPassword) {
        throw Error("invalid credentials");
      }

      const token = createJWT(user.id.toString(), user.email, user.user_type);
      return res.status(200).json({ res: token });
    } catch (err) {
      next(err);
    }
  }
}

export default UserControllers;
