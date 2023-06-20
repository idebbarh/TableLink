import { NextFunction, Request, Response } from "express";
import RestaurantRepository from "../repositories/restaurantRepository";
import StatisticRepository from "../repositories/statisticRepository";

class ReservationController {
  static async getRestaurantTodayReservations(
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
      const todayReservations = await StatisticRepository.getTodaysBookings(
        restaurant_id
      );
      res.status(200).json({ res: todayReservations });
    } catch (err) {
      next(err);
    }
  }
}

export default ReservationController;
