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
ownerRouter.get("/plates");
ownerRouter.get("/plates/:id");
ownerRouter.post("/plates");
ownerRouter.delete("/plates/:id");
ownerRouter.put("/plates/:id");
//reservations routes
ownerRouter.get("/reservations");
ownerRouter.get("/reservations/:id");
ownerRouter.delete("/reservations/:id");
//statistiques
ownerRouter.get("/statistiques");
//restaurant routes
ownerRouter.get("/restaurant", (req, res, next) =>
  OwnerController.getOwnerRestaurant(req as CustomRequest, res, next)
);
ownerRouter.put("/restaurant/:id", (req: Request, res, next) =>
  OwnerController.updateRestaurant(req as CustomRequest, res, next)
);

export default ownerRouter;
