import express, { urlencoded } from "express";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import booksRoutes from "./routes/booksRoutes.js";
import { connectDB } from "./config/mongodb.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser()); // for parsing cookie ..jwt token!

app.use("/api/auth", authRoutes); // authRoutes

app.use("/api/library", booksRoutes); // booksRoutes

app.get("/", (req, res) => {
  res.send("Server is Running...");
});
// App Level Error Handler
app.use(errorHandler);

app.listen(PORT, async () => {
  connectDB();
  console.log(`Server is up and  running on port ${PORT}`);
});
