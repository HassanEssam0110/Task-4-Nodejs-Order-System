import mongoose from "mongoose";


const { Schema, model, models } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    parentCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.post("findOneAndDelete", async function (doc) {
  if (!doc) return;
  // Delete all child categories of the deleted category
  await Category.deleteMany({ parentCategoryId: doc._id });
});

export const Category = models.Category || model("Category", categorySchema);
