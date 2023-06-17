import { NextFunction, Request, Response } from "express";
import PlateRepository from "../repositories/plateRepository";
class PlateContoller {
  static async getAllRestaurantPlates(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const restaurant_id = req.params.id;
      const plates = await PlateRepository.getManyByQuery({ restaurant_id });
      res.status(200).json({ res: plates });
    } catch (err) {
      next(err);
    }
  }
}

export default PlateContoller;
