import { Request, Router } from "express";
import OwnerController from "../controllers/ownerController";

interface CustomRequest extends Request {
  user: {
    userId: string;
    userEmail: string;
    lives_in: string;
  };
}

const ownerRouter = Router();

//waiters routes
ownerRouter.get("/employees/waiters", (req, res, next) =>
  OwnerController.getWaiters(req as CustomRequest, res, next)
);
ownerRouter.get("/employees/waiters/:id", (req: Request, res, next) =>
  OwnerController.getWaiter(req as CustomRequest, res, next)
);
ownerRouter.post("/employees/waiters", (req, res, next) =>
  OwnerController.createWaiter(req as CustomRequest, res, next)
);
ownerRouter.delete("/employees/waiters/:id", (req: Request, res, next) =>
  OwnerController.deleteWaiter(req as CustomRequest, res, next)
);
ownerRouter.put("/employees/waiters/:id", (req: Request, res, next) =>
  OwnerController.updateWaiter(req as CustomRequest, res, next)
);
//chefs routes
ownerRouter.get("/employees/chefs", (req, res, next) =>
  OwnerController.getChefs(req as CustomRequest, res, next)
);
ownerRouter.get("/employees/chefs/:id", (req: Request, res, next) =>
  OwnerController.getChef(req as CustomRequest, res, next)
);
ownerRouter.post("/employees/chefs", (req, res, next) =>
  OwnerController.createChef(req as CustomRequest, res, next)
);
ownerRouter.delete("/employees/chefs/:id", (req: Request, res, next) =>
  OwnerController.deleteChef(req as CustomRequest, res, next)
);
ownerRouter.put("/employees/chefs/:id", (req: Request, res, next) =>
  OwnerController.updateChef(req as CustomRequest, res, next)
);
//plates routes
ownerRouter.get("/plates", (req, res, next) =>
  OwnerController.getOwnerRestaurantPlates(req as CustomRequest, res, next)
);
ownerRouter.get("/plates/:id", (req: Request, res, next) =>
  OwnerController.getOwnerRestaurantPlate(req as CustomRequest, res, next)
);
ownerRouter.post("/plates", (req, res, next) =>
  OwnerController.createPlate(req as CustomRequest, res, next)
);
ownerRouter.delete("/plates/:id", (req: Request, res, next) =>
  OwnerController.deletePlate(req as CustomRequest, res, next)
);
ownerRouter.put("/plates/:id", (req: Request, res, next) =>
  OwnerController.updatePlate(req as CustomRequest, res, next)
);
//reservations routes
ownerRouter.get("/reservations", (req, res, next) =>
  OwnerController.getReservations(req as CustomRequest, res, next)
);
ownerRouter.delete("/reservations/:id", (req: Request, res, next) =>
  OwnerController.deleteReservation(req as CustomRequest, res, next)
);
//commands routes
ownerRouter.get("/commands", (req, res, next) =>
  OwnerController.getCommands(req as CustomRequest, res, next)
);
//delete command
ownerRouter.delete("/commands/:id", (req: Request, res, next) =>
  OwnerController.deleteCommand(req as CustomRequest, res, next)
);
//statistiques
ownerRouter.get("/statistiques", (req, res, next) =>
  OwnerController.getRestaurantStatistics(req as CustomRequest, res, next)
);
//restaurant routes
ownerRouter.get("/restaurant", (req, res, next) =>
  OwnerController.getOwnerRestaurant(req as CustomRequest, res, next)
);
ownerRouter.put("/restaurant/:id", (req: Request, res, next) =>
  OwnerController.updateRestaurant(req as CustomRequest, res, next)
);

export default ownerRouter;
