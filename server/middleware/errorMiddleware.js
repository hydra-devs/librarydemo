import { NODE_ENV } from "../config/env.js";

export const errorHandler = (err, req, res, next) => {
  if (err.msg || err.status) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.msg || "Something went wrong",
      errorMessage: err.message || "Something went wrong",
      stack: NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};
