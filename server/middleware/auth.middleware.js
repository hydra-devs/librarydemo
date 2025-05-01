import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  if (
    !req.headers.authorization &&
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next({ status: 401, msg: "Your are not loggedIn" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next({ status: 401, msg: "Your are not loggedIn" });
  }
  try {
    //verify token
    const jwt_verify = jwt.verify(token, JWT_SECRET);
    req.user = jwt_verify.userId;
  } catch (err) {
    err.msg = "Unable to login";
    err.status = 401;
  }
  next();
};
