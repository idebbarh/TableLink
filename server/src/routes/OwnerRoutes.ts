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
ownerRouter.get("/employees/chefs");
ownerRouter.get("/employees/chefs/:id");
ownerRouter.post("/employees/chefs");
ownerRouter.delete("/employees/chefs/:id");
ownerRouter.put("/employees/chefs/:id");
//menu routes
ownerRouter.get("/menu");
ownerRouter.get("/menu/:id");
ownerRouter.post("/menu");
ownerRouter.delete("/menu/:id");
ownerRouter.put("/menu/:id");
//reservations routes
ownerRouter.get("/reservations");
ownerRouter.get("/reservations/:id");
ownerRouter.delete("/reservations/:id");
//statistiques
ownerRouter.get("/statistiques");
//restaurant routes
ownerRouter.put("/restaurant");

export default ownerRouter;
