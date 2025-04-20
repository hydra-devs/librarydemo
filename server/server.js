import express, { urlencoded } from "express";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // for parsing cookie ..jwt token!

app.use("/api/auth", authRoutes); // Routes end points

app.get("/", (req, res) => {
  res.send("Server is Running...");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
