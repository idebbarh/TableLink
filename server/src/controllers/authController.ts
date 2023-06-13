import { NextFunction, Request, Response } from "express";
import { createJWT } from "../utils/token";
import { compareTwoPasswords } from "../utils/password";
import executeMethodsWithTransaction from "../utils/transaction";
import RestaurantRepository from "../repositories/restaurantRepository";
import { RestaurantModel } from "../models/restaurantModel";
import OwnerRepository from "../repositories/ownerRepository";
import { OwnerModel } from "../models/ownerModel";
import ClientRepository from "../repositories/clientRepository";
import { ClientModel } from "../models/clientModel";

class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    let user: ClientModel | OwnerModel;
    try {
      const { name, email, password, user_type } = req.body;
      if (user_type === "restaurant_owner") {
        const [createdUser, _] = (await executeMethodsWithTransaction(
          [
            () => OwnerRepository.createOwner({ name, email, password }),
            (id: number) =>
              RestaurantRepository.createRestaurant({
                owner_id: id,
              }),
          ],
          [{ from: 0, to: 1 }]
        )) as [OwnerModel, RestaurantModel];
        user = createdUser;
      } else {
        const createdUser = await ClientRepository.createClient({
          name,
          email,
          password,
        });
        user = createdUser;
      }
      const token = createJWT(user.id.toString(), user.email);
      return res.status(200).json({ res: token });
    } catch (err) {
      next(err);
    }
  }

  static async singin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const owner = await OwnerRepository.getByQuery({ email });
      const client = await ClientRepository.getByQuery({ email });

      const user: ClientModel | OwnerModel | null = client || owner || null;

      if (!user) {
        throw Error("invalid credentials");
      }

      const isValidPassword = await compareTwoPasswords(
        password,
        user.password
      );

      if (!isValidPassword) {
        throw Error("invalid credentials");
      }

      const token = createJWT(user.id.toString(), user.email);
      return res.status(200).json({ res: token });
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
