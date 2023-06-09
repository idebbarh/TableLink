import express from "express";
import userControllers from "./controllers/userController";
import { errorHandler } from "./utils/errorHandler";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//router
app.post("/login", userControllers.singin);
app.post("/register", userControllers.signup);

//error handler
app.use(errorHandler);
export default app;
