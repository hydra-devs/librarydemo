import mongoose from "mongoose";

const booksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      populate: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isInstore: {
      type: Boolean,
      required: true,
      default: true,
    },
    img: {
      type: String,
      required: true,
      default: "image.jpg",
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

export default mongoose.model("Books", booksSchema);
