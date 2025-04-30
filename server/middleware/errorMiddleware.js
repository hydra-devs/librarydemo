import { NODE_ENV } from "../config/env.js";

export const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  if (err.msg || err.status) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.msg || "Internal Server Error",
      errorMessage: err.message,
      stack: NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};
