import validator from "validator";
import bycrypt from "bcrypt";
import { JWT_EXPIRE, JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { email, username, fullname, password } = req.body;
  //input validation
  if (!email || !username || !fullname || !password) {
    return next({ status: 401, msg: "All fields are required" });
  }
  if (!validator.isEmail(email)) {
    return next({ status: 401, msg: "Enter a valid email address" });
  }
  const isEmailexist = await User.findOne({ email: email });
  if (isEmailexist) {
    return next({ status: 401, msg: "Email is already Registered" });
  }

  if (password.length < 6) {
    return next({ status: 401, msg: "Password must be greater than 6" });
  } else if (password.length > 16) {
    return next({ status: 401, msg: "Password must be less than 16" });
  }

  const isUsernameExist = await User.findOne({ username: username });

  if (isUsernameExist) {
    return next({ status: 401, msg: "Username already exists" });
  }

  //hashing password
  const HashPassword = await bycrypt.hash(password, 10);

  //insert to DB
  try {
    //create new user
    const newUser = new User({
      name: fullname,
      username,
      email,
      password: HashPassword,
    });
    await newUser.save();
    //generate jwt token
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: {
        userid: newUser.id,
        fullname: newUser.name,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (err) {
    err.msg = "error creating user";
    err.status = 401;
    return next(err);
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  //check if input is valid
  if (!username || !password) {
    return next({ status: 401, msg: "All fields are required" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return next({ status: 401, msg: "User not found" });
    }

    //verify password

    const isPasswordValid = await bycrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next({ status: 401, msg: "Invalid username and password" });
    }

    //generate jwt token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
    //send response

    res.status(200).json({
      success: true,
      message: "Login successful",
      username,
      userId: user.id,
      token,
    });
  } catch (err) {
    err.msg = "Login attempt failed";
    err.status = 400;
    return next(err);
  }
};
