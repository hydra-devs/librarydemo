import Book from "../models/books.model.js";
import User from "../models/user.model.js";

export const createBook = async (req, res, next) => {
  const { title, description, authorId } = req.body;

  if (!title || !description || !authorId) {
    return next({ status: 401, msg: "All fields are required" });
  }
  try {
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

export const myBook = async (req, res, next) => {
  const userexist = await User.findById(req.user);
  if (!userexist) {
    return next({ status: 401, msg: "User not found" });
  }

  const mybook = await Book.find({ authorId: req.user })
    .populate({ path: "authorId", select: "name username email -_id" })
    .select("-_id");

  res.status(200).json({
    success: true,
    message: "Book fetched successfully",
    mybook,
  });
};

export const viewBook = async (req, res, next) => {};

export const deleteBook = async (req, res, next) => {};
