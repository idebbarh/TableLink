import { NextFunction, Request, Response } from "express";
import WaiterRepository from "../repositories/waiterRepository";
import ChefRepository from "../repositories/chefRepository";
import CommandRepository from "../repositories/commandRepository";

interface CustomRequest extends Request {
  user: {
    userId: string;
    userEmail: string;
    lives_in: string;
  };
}

class ChefController {
  static async getAvailability(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const chef_id = req.user.userId;
      const chef = await ChefRepository.getById(chef_id);
      if (!chef) {
        throw Error("chef not found");
      }
      res.status(200).json({ res: { is_available: chef.is_available } });
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
      const chef_id = req.user.userId;
      const chef = await ChefRepository.getById(chef_id);

      if (!chef) {
        throw Error("chef not found");
      }

      const updatedChef = await ChefRepository.updateCols(chef_id, {
        is_available: chef.is_available === 0 ? 1 : 0,
      });

      res.status(200).json({ res: updatedChef });
    } catch (err) {
      next(err);
    }
  }

  static async getCommandsToCook(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const chef_id = req.user.userId;
      const chef = await ChefRepository.getById(chef_id);
      if (!chef) {
        throw Error("chef not found");
      }
      const restaurant_id = chef.restaurant_id;
      const commands = await CommandRepository.getManyByQuery({
        chef_id,
        is_cooked: 0,
        restaurant_id,
      });
      res.status(200).json({ res: commands });
    } catch (err) {
      next(err);
    }
  }

  static async setCommandAsCooked(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const command_id = req.params.id;
      const chef_id = req.user.userId;
      const chef = await ChefRepository.getById(chef_id);
      if (!chef) {
        throw Error("chef not found");
      }
      const waiter = await WaiterRepository.getAvailableWaiter(
        chef.restaurant_id
      );
      if (!waiter) {
        //todo
        throw Error("not available waiter found");
      }
      const waiter_id = waiter.id;
      const updatedCommand = await CommandRepository.updateCols(
        command_id,
        { is_cooked: 1, waiter_id },
        chef.restaurant_id
      );
      res.status(201).json({ res: updatedCommand });
    } catch (err) {
      next(err);
    }
  }
}

export default ChefController;
