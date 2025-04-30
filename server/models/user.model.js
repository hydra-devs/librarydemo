import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      //   required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      imutable: true,
      default: () => Date.now(),
    },
  },
  { versionKey: false }
);

export default mongoose.model("User", userSchema);
