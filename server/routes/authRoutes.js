import { Router } from "express";
import { register, login, profile } from "../controller/auth.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

authRoutes.get("/profile", authMiddleware, profile);

export default authRoutes;
