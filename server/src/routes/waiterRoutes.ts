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
waiterRouter.post("/commands", (req, res, next) =>
  WaiterController.makeCommand(req as CustomRequest, res, next)
);
//get commands to serve
waiterRouter.get("/commands", (req, res, next) =>
  WaiterController.getCommandsToServe(req as CustomRequest, res, next)
);
//set command as served
waiterRouter.put("/commands/:id/served", (req: Request, res, next) =>
  WaiterController.setCommandAsServed(req as CustomRequest, res, next)
);
//set command as payed
waiterRouter.put("/commands/:id/payed", (req: Request, res, next) =>
  WaiterController.setCommandAsPayed(req as CustomRequest, res, next)
);

export default waiterRouter;
