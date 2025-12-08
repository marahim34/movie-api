import { Router } from "express";
import { signup, login } from "../controllers/authController.js";

const authenticationRouter = Router()

authenticationRouter.post("/signup", signup);
authenticationRouter.post("/login", login);

export default authenticationRouter;