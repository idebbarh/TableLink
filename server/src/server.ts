import express from "express";
import userControllers from "./controllers/userController";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//router
app.post("/login", userControllers.singin);
app.post("/register", userControllers.signup);

export default app;
