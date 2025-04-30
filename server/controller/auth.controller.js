import validator from "validator";
import bycrypt from "bcrypt";
import { JWT_EXPIRE, JWT_SECRET } from "../config/env.js";
import { createError } from "../utils/createError.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { email, username, fullname, password } = req.body;
  //input validation
  if (!email || !username || !fullname || !password) {
    return next(createError("All field are Required"));
  }
  if (!validator.isEmail(email)) {
    return next(createError("Invalid Email"));
  }

  if (password.length < 6) {
    return next(createError("Password must be greater than 6 characters"));
  } else if (password.length > 16) {
    return next(createError("Password must be less than 16 characters"));
  }

  //hashing password
  const HashPassword = await bycrypt.hash(password, 10);

  //generate jwt token
  const token = jwt.sign({ Userid: User._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });

  //insert to DB
  try {
    const user = new User({
      name: fullname,
      username,
      email,
      password: HashPassword,
    });
    await user.save();
    res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
      token,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return next(createError("All field are Required", 400));
    }

    const user = await User.findOne({ username });

    if (!user) {
      return next(createError("Invalid username or password", 401));
    }

    //verify password

    const isPasswordValid = await bycrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createError("Invalid username or password", 401));
    }

    //generate jwt token
    const token = jwt.sign({ Userid: User._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
    //send response

    res.status(200).json({
      success: true,
      message: "Login successful",
      username,
      userId: user._id,
      token,
    });
  } catch (err) {
    err.msg = "Login attempt failed";
    err.status = 400;
    return next(err);
  }
};
