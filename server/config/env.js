import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;

export const DB_URI = process.env.DB_URI;

export const NODE_ENV = process.env.NODE_ENV || "development";

export const JWT_SECRET = process.env.JWT_SECRET;

export const JWT_EXPIRE = process.env.JWT_EXPIRE;
