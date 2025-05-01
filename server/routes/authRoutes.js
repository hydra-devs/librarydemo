import { Router } from "express";
import { register, login } from "../controller/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

export default authRoutes;
