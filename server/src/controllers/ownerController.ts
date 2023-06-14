import { NextFunction, Request, Response } from "express";
import WaiterRepository from "../repositories/waiterRepository";
import RestaurantRepository from "../repositories/restaurantRepository";
import { hashPassword } from "../utils/password";

class OwnerController {
  static async createWaiter(req: Request, res: Response, next: NextFunction) {
    try {
      let { name, email, password, owner_id } = req.body;
      password = await hashPassword(password);
      const restaurant = await RestaurantRepository.getByQuery({ owner_id });
      if (!restaurant) {
        throw Error("invalid or not exist owner_id");
      }
      console.log(name, email, password, owner_id, restaurant.id);
      const waiter = await WaiterRepository.createWaiter({
        name,
        email,
        password,
        restaurant_id: restaurant.id,
      });
      res.status(201).json({ res: waiter });
    } catch (err) {
      next(err);
    }
  }
  static async getWaiters(req: Request, res: Response, next: NextFunction) {
    try {
      const { owner_id } = req.body;
      const waiters = await WaiterRepository.getAll(owner_id);
      res.status(200).json({ res: waiters });
    } catch (err) {
      next(err);
    }
  }
  static async getWaiter(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      console.log(id);
      const waiter = await WaiterRepository.getById(id);
      res.status(200).json({ res: waiter });
    } catch (err) {
      next(err);
    }
  }
}

export default OwnerController;
