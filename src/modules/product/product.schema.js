import Joi from "joi";
import { generalRoles } from "../../utils/index.utils.js";

const getProductSchema = {
  params: Joi.object({
    id: generalRoles.id.required(),
  }),
};

const createProductSchema = {
  body: Joi.object({
    name: generalRoles.productName.required(),
    price: generalRoles.price.required(),
    categories: generalRoles.categories.required(),
  }),
};

const updateProductSchema = {
  params: Joi.object({
    id: generalRoles.id.required(),
  }),
  body: Joi.object({
    name: generalRoles.productName.optional(),
    price: generalRoles.price.optional(),
    categories: generalRoles.categories.optional(),
  }),
};

const deleteProductSchema = {
  params: Joi.object({
    id: generalRoles.id.required(),
  }),
  query: Joi.object({
    softDelete: generalRoles.softDelete.optional(),
  }),
};

export {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  deleteProductSchema,
};
