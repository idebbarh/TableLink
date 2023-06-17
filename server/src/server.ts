import express, { Request } from "express";
import AuthController from "./controllers/authController";
import { errorHandler } from "./utils/errorHandler";
import ownerRouter from "./routes/OwnerRoutes";
import globalProtector from "./middlewares/globalProtector";
import userTypeProtector from "./middlewares/userTypeProtector";
import RestaurantController from "./controllers/restaurantController";
import PlateContoller from "./controllers/plateController";

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

//#pv routes
//##auth routes
app.post("/login", AuthController.singin);
app.post("/register", AuthController.signup);
//##owner routes
app.use(
  "/api/owner",
  (req, res, next) => globalProtector(req as CustomRequest, res, next),
  (req, res, next) =>
    userTypeProtector(req as CustomRequest, res, next, "owners"),
  ownerRouter
);
//#public routes
//##restaurant routes
app.get("/api/restaurants", RestaurantController.getRestaurants);
app.get("/api/restaurants/:id", RestaurantController.getRestaurant);
//##plate routes
app.get("/api/plates/:id", PlateContoller.getAllRestaurantPlates);
//error handler
app.use(errorHandler);
export default app;
