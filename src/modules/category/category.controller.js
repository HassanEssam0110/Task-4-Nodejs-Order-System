import * as handler from "../api-handler-factory.js";
import { Category } from "../../database/models/index.models.js";

const getCategories = handler.getAll(Category, {
  path: "parentCategoryId",
  select: "name",
});
const getCategory = handler.getOne(Category, {
  path: "parentCategoryId",
  select: "name",
});
const createCategory = handler.createOne(Category);
const updateCategory = handler.updataOne(Category);
const deleteCategory = handler.deleteOne(Category);

export {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
