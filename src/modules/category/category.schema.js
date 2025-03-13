import Joi from "joi";
import { generalRoles } from "../../utils/index.utils.js";

const getCategorySchema = {
  params: Joi.object({
    id: generalRoles.id.required(),
  }),
};

const createCategorySchema = {
  body: Joi.object({
    name: generalRoles.categoryName.required(),
    parentCategoryId: generalRoles.parentCategoryId.optional(),
  }),
};

const updateCategorySchema = {
  params: Joi.object({
    id: generalRoles.id.required(),
  }),
  body: Joi.object({
    name: generalRoles.categoryName.optional(),
    parentCategoryId: generalRoles.parentCategoryId.optional(),
  }),
};

const deleteCategorySchema = {
  params: Joi.object({
    id: generalRoles.id.required(),
  }),
  query: Joi.object({
    softDelete: generalRoles.softDelete.optional(),
  }),
};

export {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
};
