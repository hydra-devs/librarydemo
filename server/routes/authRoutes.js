import { Router } from "express";
import { register, login } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/register", register);

authRoutes.post("/login", authMiddleware, login);

export default authRoutes;
