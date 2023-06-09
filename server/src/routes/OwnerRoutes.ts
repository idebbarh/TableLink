import { Router } from "express";

const ownerRouter = Router();

//get all employees
ownerRouter.get();
//get all menu items
ownerRouter.get();
//get all reservation
ownerRouter.get();
//get restauration statistiques
ownerRouter.get();
//create new employee
ownerRouter.post();
//create new menu item
ownerRouter.post();
//delete employee
ownerRouter.delete();
//delete menu item
ownerRouter.delete();
//delete reservation
ownerRouter.delete();
//edit employee
ownerRouter.put();
//edit menu item
ownerRouter.put();

export default ownerRouter;
