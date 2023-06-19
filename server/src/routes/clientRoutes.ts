import { Request, Router } from "express";
import ClientRepository from "../repositories/clientRepository";
import ClientController from "../controllers/clientController";

interface CustomRequest extends Request {
  user: {
    userId: string;
    userEmail: string;
    lives_in: string;
  };
}

const clientRouter = Router();

//make reservation
clientRouter.post("/reservation/:id", (req: Request, res, next) =>
  ClientController.makeReservation(req as CustomRequest, res, next)
);
//make review
clientRouter.post("/review/:id", (req: Request, res, next) =>
  ClientController.makeReservation(req as CustomRequest, res, next)
);
//make comment

export default clientRouter;