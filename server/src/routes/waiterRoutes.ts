import { Request, Router } from "express";
import WaiterController from "../controllers/waiterController";

interface CustomRequest extends Request {
  user: {
    userId: string;
    userEmail: string;
    lives_in: string;
  };
}

const waiterRouter = Router();
//get waiter availability
waiterRouter.get("/availability", (req, res, next) =>
  WaiterController.getAvailability(req as CustomRequest, res, next)
);
//change waiter availability
waiterRouter.put("/availability", (req, res, next) =>
  WaiterController.toggleAvailability(req as CustomRequest, res, next)
);

//make command
waiterRouter.post("/commands");
//get commands to serve
waiterRouter.get("/commands");
//set command as served
waiterRouter.put("/commands/id/served");
//set command as payed
waiterRouter.put("/commands/id/payed");

export default waiterRouter;
