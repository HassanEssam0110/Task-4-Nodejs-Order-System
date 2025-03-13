import Joi from "joi";
import { generalRoles } from "../../utils/index.utils.js";

const getOrderSchema = {
  params: Joi.object({
    id: generalRoles.id.required(),
  }),
};

const createOrderSchema = {
  body: Joi.object({
    user: generalRoles.orderUser.required(),
    items: generalRoles.items.required(),
  }),
};

const updateOrderSchema = {
  params: Joi.object({
    id: generalRoles.id.required(),
  }),
  body: Joi.object({
    user: generalRoles.orderUser.required(),
    items: generalRoles.items.required(),
  }),
};

const deleteOrderSchema = {
  params: Joi.object({
    id: generalRoles.id.required(),
  }),
};

export {
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
  deleteOrderSchema,
};
