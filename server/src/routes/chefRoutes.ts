import { Request, Router } from "express";
import ChefController from "../controllers/chefController";

interface CustomRequest extends Request {
  user: {
    userId: string;
    userEmail: string;
    lives_in: string;
  };
}

const chefRouter = Router();

//get chef availability
chefRouter.get("/availability", (req, res, next) =>
  ChefController.getAvailability(req as CustomRequest, res, next)
);
//change chef availability
chefRouter.put("/availability", (req, res, next) =>
  ChefController.toggleAvailability(req as CustomRequest, res, next)
);
//get commands to cook
chefRouter.get("/commands", (req, res, next) =>
  ChefController.getCommandsToCook(req as CustomRequest, res, next)
);
//set command as cooked
chefRouter.put("/commands/:id/cooked", (req: Request, res, next) =>
  ChefController.setCommandAsCooked(req as CustomRequest, res, next)
);

export default chefRouter;
