import Book from "../models/books.model.js";
import { createError } from "../utils/createError.js";

export const createBook = async (req, res, next) => {
  const { title, description, authorId } = req.body;
  try {
    if (!title || !description || !authorId) {
      return next(createError("All fields are required", 400));
    }

    const book = new Book({
      title,
      description,
      authorId,
    });
    await book.save();
    res.status(200).json({
      success: true,
      message: "Book created Succesfully",
      book,
    });
  } catch (err) {
    err.msg = "Error creating book";
    err.status = 401;
    return next(err);
  }
};

export const viewBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate({
      path: "authorId",
      select: "name username -_id",
    });
    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      books,
    });
  } catch (err) {
    err.msg = "Error fetching books";
    err.status = 401;
    return next(err);
  }
};

export const viewBook = async (req, res, next) => {};

export const deleteBook = async (req, res, next) => {};
