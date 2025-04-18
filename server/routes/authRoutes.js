import { Router } from "express";

const authRoutes = Router();

authRoutes.get("/register", (req, res) => {
  res.send("register");
});

authRoutes.get("/login", (req, res) => {
  res.send("login");
});

export default authRoutes;
