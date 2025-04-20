import { Router } from "express";
import { register } from "../controller/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", register);

authRoutes.get("/login", (req, res) => {
  res.send("login");
});

export default authRoutes;
