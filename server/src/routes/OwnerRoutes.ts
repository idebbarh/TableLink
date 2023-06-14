import { Router } from "express";
import OwnerController from "../controllers/ownerController";

const ownerRouter = Router();

//waiters routes
ownerRouter.get("/employees/waiters", OwnerController.getWaiters);
ownerRouter.get("/employees/waiters/:id", OwnerController.getWaiter);
ownerRouter.post("/employees/waiters", OwnerController.createWaiter);
ownerRouter.delete("/employees/waiters/:id");
ownerRouter.put("/employees/waiters/:id");
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
