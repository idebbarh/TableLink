import express, { Request } from "express";
import AuthController from "./controllers/authController";
import { errorHandler } from "./utils/errorHandler";
import ownerRouter from "./routes/ownerRoutes";
import globalProtector from "./middlewares/globalProtector";
import userTypeProtector from "./middlewares/userTypeProtector";
import RestaurantController from "./controllers/restaurantController";
import PlateContoller from "./controllers/plateController";
import clientRouter from "./routes/clientRoutes";

interface CustomRequest extends Request {
  user: {
    userId: string;
    userEmail: string;
    lives_in: string;
  };
}

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//auth routes
app.post("/login", AuthController.singin);
app.post("/register", AuthController.signup);
//owner routes
app.use(
  "/api/owner",
  (req, res, next) => globalProtector(req as CustomRequest, res, next),
  (req, res, next) =>
    userTypeProtector(req as CustomRequest, res, next, "owners"),
  ownerRouter
);
//client routes
app.use(
  "/api/client",
  (req, res, next) => globalProtector(req as CustomRequest, res, next),
  (req, res, next) =>
    userTypeProtector(req as CustomRequest, res, next, "clients"),
  clientRouter
);
//restaurant routes
app.get("/api/restaurants", RestaurantController.getRestaurants);
app.get("/api/restaurants/:id", RestaurantController.getRestaurant);
//plate routes
app.get("/api/plates/:id", PlateContoller.getAllRestaurantPlates);
//error handler
app.use(errorHandler);
export default app;
