import { NextFunction, Request, Response } from "express";
import RestaurantRepository from "../repositories/restaurantRepository";
import ReservationRepository from "../repositories/reservationRepository";
import ClientRepository from "../repositories/clientRepository";
import ReviewRepository from "../repositories/reviewRepository";

interface CustomRequest extends Request {
  user: {
    userId: string;
    userEmail: string;
    lives_in: string;
  };
}
class ClientController {
  static async makeReservation(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { date, time, guests } = req.body;
      const client_id = req.user.userId;
      const restaurant_id = req.params.id;
      const restaurant = await RestaurantRepository.getById(restaurant_id);
      if (!restaurant) {
        throw Error("restaurant not found");
      }
      const reservation = await ReservationRepository.createReservation({
        date,
        time,
        guests,
        client_id,
        restaurant_id,
      });
      res.status(201).json({ res: reservation });
    } catch (err) {
      next(err);
    }
  }
  static async checkAvailability(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { date } = req.body;
      const restaurant_id = req.params.id;
      const restaurant = await RestaurantRepository.getById(restaurant_id);
      if (!restaurant) {
        throw Error("restaurant not found");
      }
      const availability =
        await RestaurantRepository.checkReservationAvailability(
          restaurant_id,
          date
        );
      res.status(200).json({ res: availability });
    } catch (err) {
      next(err);
    }
  }
  //if the client already maked a review will update his review with the new value provided.
  static async makeReview(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { rating } = req.body;
      const client_id = req.user.userId;
      const restaurant_id = req.params.id;
      const restaurant = await RestaurantRepository.getById(restaurant_id);
      if (!restaurant) {
        throw Error("restaurant not found");
      }
      const review = await ReviewRepository.createReview({
        rating,
        client_id,
        restaurant_id,
      });
      res.status(201).json({ res: review });
    } catch (err) {
      next(err);
    }
  }
  static async getClientReviewToRestaurant(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const client_id = req.user.userId;
      const restaurant_id = req.params.id;
      const restaurant = await RestaurantRepository.getById(restaurant_id);
      if (!restaurant) {
        throw Error("restaurant not found");
      }
      const review = await ReviewRepository.getByQuery({
        client_id,
        restaurant_id,
      });
      res.status(200).json({ res: review });
    } catch (err) {
      next(err);
    }
  }
}

export default ClientController;
