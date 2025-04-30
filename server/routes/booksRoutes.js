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

bookRoutes.post("/create", createBook);
bookRoutes.get("/viewbooks", viewBooks);
bookRoutes.get("/viewbook", viewBook);
bookRoutes.post("/mybook", authMiddleware, myBook);
bookRoutes.post("/delete", deleteBook);

export default bookRoutes;
