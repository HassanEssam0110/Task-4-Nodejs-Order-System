import { Order } from "../../database/models/index.models.js";
import * as handler from "../api-handler-factory.js";

const getAllOrders = handler.getAll(Order, [
  { path: "user", select: "username email" },
  { path: "items.product", select: "name price" },
]);
const getOrder = handler.getOne(Order, [
  { path: "user", select: "username email" },
  { path: "items.product", select: "name price" },
]);
const createOrder = handler.createOne(Order);
const updateOrder = handler.updataOne(Order);
const deleteOrder = handler.deleteOne(Order);

export { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder };
