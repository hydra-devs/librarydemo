import { Router } from "express";

const bookRoutes = Router();

import {
  createBook,
  viewBook,
  viewBooks,
  deleteBook,
} from "../controller/books.controller.js";

bookRoutes.post("/create", createBook);
bookRoutes.get("/viewbooks", viewBooks);
bookRoutes.get("/viewbook", viewBook);
bookRoutes.post("/delete", deleteBook);

export default bookRoutes;
