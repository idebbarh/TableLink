import express, { Request } from "express";
import userControllers from "./controllers/userController";
import { errorHandler } from "./utils/errorHandler";
import ownerRouter from "./routes/OwnerRoutes";
import globalProtector from "./middlewares/globalProtector";
import userTypeProtector from "./middlewares/userTypeProtector";

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

//router
app.post("/login", userControllers.singin);
app.post("/register", userControllers.signup);
//owner routes
app.use(
  "/api/owner",
  globalProtector,
  (req, res, next) =>
    userTypeProtector(req as CustomRequest, res, next, "owner"),
  ownerRouter
);
//error handler
app.use(errorHandler);
export default app;
