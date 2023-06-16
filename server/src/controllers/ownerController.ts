import { NextFunction, Request, Response } from "express";
import WaiterRepository from "../repositories/waiterRepository";
import RestaurantRepository from "../repositories/restaurantRepository";
import { hashPassword } from "../utils/password";
import UserRepository from "../repositories/userRepository";
import executeMethodsWithTransaction from "../utils/transaction";
import WaiterModel from "../models/waiterModel";
import { UserModel } from "../models/userModel";
import { UserType } from "../types/types";
import RestaurantController from "./restaurantController";

interface CustomRequest extends Request {
  user: {
    userId: string;
    userEmail: string;
    lives_in: string;
  };
}
class OwnerController {
  //there is two ways to get the waiter that i want
  //by give the method just the owner_id and make join query between the restaurant and the owner to get the waiter or by give it directelly the restaurant id.
  static async createWaiter(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      let { name, email, password } = req.body;
      password = await hashPassword(password);
      const owner_id = req.user.userId;
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error("maybe this owner doesn't have a restaurant");
      }

      const [waiter] = (await executeMethodsWithTransaction([
        () =>
          WaiterRepository.createWaiter({
            name,
            email,
            password,
            restaurant_id: restaurant.id,
          }),
        () => UserRepository.createUser({ email, lives_in: UserType.WAITERS }),
      ])) as [WaiterModel, UserModel];

      res.status(201).json({ res: waiter });
    } catch (err) {
      next(err);
    }
  }
  static async getWaiters(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const owner_id = req.user.userId;
      const waiters = await WaiterRepository.getAll(owner_id);
      res.status(200).json({ res: waiters });
    } catch (err) {
      next(err);
    }
  }
  static async getWaiter(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const owner_id = req.user.userId;
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error("maybe this owner doesn't have a restaurant");
      }
      const waiter = await WaiterRepository.getById(id, restaurant.id);
      if (!waiter) {
        throw Error("waiter not found");
      }
      res.status(200).json({ res: waiter });
    } catch (err) {
      next(err);
    }
  }
  static async deleteWaiter(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const owner_id = req.user.userId;
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error("maybe this owner doesn't have a restaurant");
      }
      const waiter = await WaiterRepository.getById(id, restaurant.id);
      if (!waiter) {
        throw Error("waiter not found");
      }
      await executeMethodsWithTransaction([
        () => WaiterRepository.deleteById(id, restaurant.id),
        () => UserRepository.deleteByEmail(waiter.email),
      ]);

      res.status(201).json({ res: waiter });
    } catch (err) {
      next(err);
    }
  }
  static async updateWaiter(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const owner_id = req.user.userId;
      let { name, email, password } = req.body;
      password = await hashPassword(password);
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error("maybe this owner doesn't have a restaurant");
      }
      const waiter = await WaiterRepository.getById(id, restaurant.id);

      if (!waiter) {
        throw Error("waiter not found");
      }

      const [updatedWaiter] = (await executeMethodsWithTransaction([
        () =>
          WaiterRepository.updateCols(
            id,
            { name, email, password },
            restaurant.id
          ),
        () => UserRepository.updateEmail(waiter.email, email),
      ])) as [WaiterModel, void];
      res.status(201).json({ res: updatedWaiter });
    } catch (err) {
      next(err);
    }
  }

  static async updateRestaurant(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const owner_id = req.user.userId;
      const id = req.params.id;
      const { name, tele, description, tables_number } = req.body;
      const updatedRestaurant = await RestaurantRepository.updateCols(
        id,
        { name, tele, description, tables_number },
        owner_id
      );
      res.status(201).json({ res: updatedRestaurant });
    } catch (err) {
      next(err);
    }
  }
  //owner have just one restaurant for now
  static async getOwnerRestaurant(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const owner_id = req.user.userId;
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error(
          "this is not suppose to happend, but this owner does not have restaurant"
        );
      }
      res.status(200).json({ res: restaurant });
    } catch (err) {
      next(err);
    }
  }
}

export default OwnerController;
