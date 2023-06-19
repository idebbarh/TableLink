import { NextFunction, Request, Response } from "express";
import ReviewRepository from "../repositories/reviewRepository";
import RestaurantRepository from "../repositories/restaurantRepository";

class ReviewController {
  static async getAllRestaurantReviews(
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
      const review = await ReviewRepository.getManyByQuery({ restaurant_id });
      res.status(200).json({ res: review });
    } catch (err) {
      next(err);
    }
  }
}

export default ReviewController;
