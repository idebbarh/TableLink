import { NextFunction, Request, Response } from "express";
import PlateRepository from "../repositories/plateRepository";
import RestaurantRepository from "../repositories/restaurantRepository";
class PlateContoller {
  static async getAllRestaurantPlates(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const restaurant_id = req.params.id;
      const restaurant = await RestaurantRepository.getById(restaurant_id);
      if (!restaurant) {
        throw Error("restaurant not found");
      }
      const plates = await PlateRepository.getManyByQuery({ restaurant_id });
      res.status(200).json({ res: plates });
    } catch (err) {
      next(err);
    }
  }
}

export default PlateContoller;
