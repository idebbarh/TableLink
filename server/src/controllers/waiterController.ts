import { NextFunction, Request, Response } from "express";
import WaiterRepository from "../repositories/waiterRepository";
import ChefRepository from "../repositories/chefRepository";
import CommandRepository from "../repositories/commandRepository";
import PlateRepository from "../repositories/plateRepository";

interface CustomRequest extends Request {
  user: {
    userId: string;
    userEmail: string;
    lives_in: string;
  };
}

class WaiterController {
  static async getAvailability(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const waiter_id = req.user.userId;
      const waiter = await WaiterRepository.getById(waiter_id);
      if (!waiter) {
        throw Error("waiter not found");
      }
      res.status(200).json({ res: { is_available: waiter.is_available } });
    } catch (err) {
      next(err);
    }
  }
  static async toggleAvailability(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const waiter_id = req.user.userId;
      const waiter = await WaiterRepository.getById(waiter_id);

      if (!waiter) {
        throw Error("waiter not found");
      }

      const updatedWaiter = await WaiterRepository.updateCols(waiter_id, {
        is_available: waiter.is_available === 0 ? 1 : 0,
      });

      res.status(200).json({ res: updatedWaiter });
    } catch (err) {
      next(err);
    }
  }

  static async makeCommand(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { plate_id } = req.body;
      const waiter_id = req.user.userId;
      const waiter = await WaiterRepository.getById(waiter_id);
      if (!waiter) {
        throw Error("waiter not found");
      }
      const restaurant_id = waiter.restaurant_id;
      const plate = await PlateRepository.getById(plate_id, restaurant_id);
      if (!plate) {
        throw Error("plate not found");
      }
      const chef = await ChefRepository.getAvailableChef(restaurant_id);
      if (!chef) {
        //todo
        throw Error("not available chefs found");
      }
      const chef_id = chef.id;
      const command = await CommandRepository.createCommand(
        plate_id,
        chef_id,
        restaurant_id
      );
      res.status(201).json({ res: command });
    } catch (err) {
      next(err);
    }
  }
  static async getCommandsToServe(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const waiter_id = req.user.userId;
      const waiter = await WaiterRepository.getById(waiter_id);
      if (!waiter) {
        throw Error("waiter not found");
      }
      const restaurant_id = waiter.restaurant_id;
      const commands = await CommandRepository.getManyByQuery({
        waiter_id,
        is_cooked: 1,
        is_served: 0,
        restaurant_id,
      });
      res.status(200).json({ res: commands });
    } catch (err) {
      next(err);
    }
  }
  static async getCommandsToPay(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const waiter_id = req.user.userId;
      const waiter = await WaiterRepository.getById(waiter_id);
      if (!waiter) {
        throw Error("waiter not found");
      }
      const restaurant_id = waiter.restaurant_id;
      const commands = await CommandRepository.getManyByQuery({
        waiter_id,
        is_cooked: 1,
        is_served: 1,
        is_payed: 0,
        restaurant_id,
      });
      res.status(200).json({ res: commands });
    } catch (err) {
      next(err);
    }
  }

  static async setCommandAsServed(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const command_id = req.params.id;
      const waiter_id = req.user.userId;
      const waiter = await WaiterRepository.getById(waiter_id);
      if (!waiter) {
        throw Error("waiter not found");
      }
      const updatedCommand = await CommandRepository.updateCols(
        command_id,
        { is_served: 1 },
        waiter.restaurant_id
      );
      res.status(201).json({ res: updatedCommand });
    } catch (err) {
      next(err);
    }
  }
  static async setCommandAsPayed(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const command_id = req.params.id;
      const waiter_id = req.user.userId;
      const waiter = await WaiterRepository.getById(waiter_id);
      if (!waiter) {
        throw Error("waiter not found");
      }
      const updatedCommand = await CommandRepository.updateCols(
        command_id,
        { is_payed: 1 },
        waiter.restaurant_id
      );
      res.status(201).json({ res: updatedCommand });
    } catch (err) {
      next(err);
    }
  }
}
export default WaiterController;
