import { Product } from "../../database/models/index.models.js";
import * as handler from "../api-handler-factory.js";

const getProducts = handler.getAll(Product, {
  path: "categories",
  select: "name",
});
const getProduct = handler.getOne(Product, {
  path: "categories",
  select: "name",
});
const createProduct = handler.createOne(Product);
const updateProduct = handler.updataOne(Product);
const deleteProduct = handler.deleteOne(Product);

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
