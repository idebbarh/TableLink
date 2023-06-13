import { NextFunction, Request, Response } from "express";

class OwnerController {
  static async getWaiters(req: Request, res: Response, next: NextFunction) {
    const { owner_id } = req.body;
    try {
    } catch (err) {
      next(err);
    }
  }
}
