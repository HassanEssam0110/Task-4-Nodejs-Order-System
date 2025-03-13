import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [1, "Product price must be at least 1"],
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", productSchema);
