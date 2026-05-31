import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    reviewType: {
      type: String,
      required: true,
    },
    carName: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Review ||
  mongoose.model("Review", ReviewSchema);