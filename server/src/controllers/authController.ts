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
import WaiterModel from "../models/waiterModel";
import ChefModel from "../models/chefModel";

function instanceOfT<T>(obj: any, props: (keyof T)[]): obj is T {
  if (typeof obj === "object") {
    return props.every((prop) => prop in obj);
  }
  return false;
}

class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    let specificUser: ClientModel | OwnerModel;
    let user: UserModel;
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
        specificUser = res[0];
        user = res[2];
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
        specificUser = res[0];
        user = res[1];
      }
      const token = createJWT(
        specificUser.id.toString(),
        specificUser.email,
        lives_in
      );
      return res.status(200).json({
        res: {
          token,
          user: {
            name: specificUser.name,
            email: user.email,
            lives_in: user.lives_in,
          },
        },
      });
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
        (OwnerModel | ClientModel | WaiterModel | ChefModel)[]
      > => {
        switch (user.lives_in) {
          case "owners":
            const owner = (await query("select * from owners where email = ?", [
              email,
            ])) as OwnerModel[];
            return owner;
          case "clients":
            const client = (await query(
              "select * from clients where email = ?",
              [email]
            )) as ClientModel[];
            return client;

          case "waiters":
            const waiter = (await query(
              "select * from waiters where email = ?",
              [email]
            )) as WaiterModel[];
            return waiter;

          default:
            const chef = (await query("select * from chefs where email = ?", [
              email,
            ])) as ChefModel[];
            return chef;
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

      const token = createJWT(
        specificUser[0].id.toString(),
        specificUser[0].email,
        user.lives_in
      );

      const resUserValue: {
        name: string;
        email: string;
        lives_in: string;
        restaurant_id?: number | string;
      } = {
        name: specificUser[0].name,
        email: user.email,
        lives_in: user.lives_in,
      };

      if (
        instanceOfT<WaiterModel>(specificUser[0], ["restaurant_id"]) ||
        instanceOfT<ChefModel>(specificUser[0], ["restaurant_id"])
      ) {
        resUserValue["restaurant_id"] = specificUser[0].restaurant_id;
      }
      return res.status(200).json({
        res: {
          token,
          user: resUserValue,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
