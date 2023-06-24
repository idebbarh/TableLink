import { NextFunction, Request, Response } from "express";
import WaiterRepository from "../repositories/waiterRepository";

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

  static async makeCommand(req: Request, res: Response, next: NextFunction) {}
  static async getCommandsToServe(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {}
  static async setCommandAsServed(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {}
  static async setCommandAsPayed(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {}
}
export default WaiterController;
