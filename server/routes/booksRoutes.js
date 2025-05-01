import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";

const bookRoutes = Router();

import {
  createBook,
  viewBook,
  viewBooks,
  deleteBook,
  myBook,
} from "../controller/books.controller.js";

bookRoutes.post("/create", authMiddleware, createBook);
bookRoutes.get("/viewbooks", viewBooks);
bookRoutes.get("/viewbook/:id", viewBook);
bookRoutes.post("/mybook", authMiddleware, myBook);
bookRoutes.delete("/delete/:id", authMiddleware, deleteBook);

export default bookRoutes;
