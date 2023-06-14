import { NextFunction, Request, Response } from "express";
import { createJWT } from "../utils/token";
import { compareTwoPasswords, hashPassword } from "../utils/password";
import executeMethodsWithTransaction from "../utils/transaction";
import RestaurantRepository from "../repositories/restaurantRepository";
import { RestaurantModel } from "../models/restaurantModel";
import OwnerRepository from "../repositories/ownerRepository";
import { OwnerModel } from "../models/ownerModel";
import ClientRepository from "../repositories/clientRepository";
import { ClientModel } from "../models/clientModel";
import UserRepository from "../repositories/userRepository";
import { UserModel } from "../models/userModel";
import { query } from "../database/mysql";

class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    let user: ClientModel | OwnerModel;
    try {
      let { name, email, password, lives_in } = req.body;
      password = await hashPassword(password);
      if (lives_in === "owners") {
        const res = (await executeMethodsWithTransaction(
          [
            () => OwnerRepository.createOwner({ name, email, password }),
            (id: number) =>
              RestaurantRepository.createRestaurant({
                owner_id: id,
              }),
            () => UserRepository.createUser({ email, lives_in }),
          ],
          [{ from: 0, to: 1 }]
        )) as [OwnerModel, RestaurantModel, UserModel];
        user = res[0];
      } else {
        const res = (await executeMethodsWithTransaction([
          () =>
            ClientRepository.createClient({
              name,
              email,
              password,
            }),
          () => UserRepository.createUser({ email, lives_in }),
        ])) as [ClientModel, UserModel];
        user = res[0];
      }
      const token = createJWT(user.id.toString(), user.email, lives_in);
      return res.status(200).json({ res: token });
    } catch (err) {
      next(err);
    }
  }

  static async singin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await UserRepository.getByQuery({ email });

      if (!user) {
        throw Error("invalid credentials");
      }

      const getSpecificUser = async (): Promise<
        (OwnerModel | ClientModel)[]
      > => {
        let res: (OwnerModel | ClientModel)[];
        switch (user.lives_in) {
          case "owners":
            res = (await query("select * from owners where email = ?", [
              email,
            ])) as OwnerModel[];
            return res;

          default:
            res = (await query("select * from clients where email = ?", [
              email,
            ])) as ClientModel[];
            return res;
        }
      };
      const specificUser = await getSpecificUser();

      if (specificUser.length === 0) {
        throw Error("impossible this to happend");
      }

      const isValidPassword = await compareTwoPasswords(
        password,
        specificUser[0].password
      );

      if (!isValidPassword) {
        throw Error("invalid credentials");
      }
      console.log(specificUser);

      const token = createJWT(
        specificUser[0].id.toString(),
        specificUser[0].email,
        user.lives_in
      );
      return res.status(200).json({ res: token });
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
