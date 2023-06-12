import express, { Request } from "express";
import UserController from "./controllers/userController";
import { errorHandler } from "./utils/errorHandler";
import ownerRouter from "./routes/OwnerRoutes";
import globalProtector from "./middlewares/globalProtector";
import userTypeProtector from "./middlewares/userTypeProtector";
import RestaurantController from "./controllers/restaurantController";

interface CustomRequest extends Request {
  user: {
    userId: string;
    userEmail: string;
    userType: string;
  };
}

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//auth routes
app.post("/login", UserController.singin);
app.post("/register", UserController.signup);
//owner routes
app.use(
  "/api/owner",
  globalProtector,
  (req, res, next) =>
    userTypeProtector(req as CustomRequest, res, next, "owner"),
  ownerRouter
);
//restaurants routes
app.get("/api/restaurants", RestaurantController.getRestaurants);
//error handler
app.use(errorHandler);
export default app;
