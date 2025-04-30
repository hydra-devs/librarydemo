import mangoose from "mongoose";
import { DB_URI } from "../config/env.js";

if (!DB_URI) {
  console.log("Invalid URI");
}

export const connectDB = async () => {
  try {
    await mangoose.connect(DB_URI);
    console.log("connected to db  ");
  } catch (err) {
    console.log(err);
  }
};
