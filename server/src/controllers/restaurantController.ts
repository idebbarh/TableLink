import { NextFunction, Request, Response } from "express";
import RestaurantRepository from "../repositories/restaurantRepository";

class RestaurantController {
  static async getRestaurants(_: Request, res: Response, next: NextFunction) {
    try {
      const restaurants = await RestaurantRepository.getAll();
      res.status(200).json({ res: restaurants });
    } catch (err) {
      next(err);
    }
  }

  static async getRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const restaurant = await RestaurantRepository.getById(id);
      res.status(200).json({ res: restaurant });
    } catch (err) {
      next(err);
    }
  }
}

export default RestaurantController;
