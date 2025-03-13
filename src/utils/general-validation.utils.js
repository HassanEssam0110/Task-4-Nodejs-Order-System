import Joi from "joi";
import { Types } from "mongoose";
import { roles } from "./index.utils.js";

// Custom validation function for mongoose ObjectId
const validId = (value, helpers) => {
  return Types.ObjectId.isValid(value) ? value : helpers.error("any.invalid");
};

export const generalRoles = {
  // ?==> ID Roles
  id: Joi.string().custom(validId).trim().messages({
    "string.base": "ID must be a string.",
    "string.empty": "ID cannot be empty.",
    "any.invalid": "Invalid ID format.",
  }),

  // ?==> soft delete roles
  softDelete: Joi.string().valid("true", "false").messages({
    "any.only": "softDelete must be 'true' or 'false'.",
  }),

  // ?==> User
  username: Joi.string().min(6).max(55).trim().messages({
    "string.base": "User name must be a string.",
    "string.empty": "User name cannot be empty.",
    "string.min": "User name must be at least {#limit} characters long.",
    "string.max": "User name cannot exceed {#limit} characters.",
    "any.required": "User name is required.",
  }),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .trim()
    .messages({
      "string.base": "Password must be a string.",
      "string.empty": "Password is required.",
      "any.required": "Password is required.",
      "string.pattern.base":
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.",
    }),

  repeat_password: Joi.any().valid(Joi.ref("password")).messages({
    "any.only": "Passwords do not match.",
  }),

  role: Joi.string()
    .valid(...Object.values(roles))
    .messages({
      "any.only": "Role must be 'admin', 'moderator', or 'user'.",
    }),

  // ?==> Category
  categoryName: Joi.string().min(3).max(150).trim().messages({
    "string.base": "Category name must be a string.",
    "string.empty": "Category name cannot be empty.",
    "string.min": "Category name must be at least {#limit} characters long.",
    "string.max": "Category name cannot exceed {#limit} characters.",
    "any.required": "Category name is required.",
  }),
  parentCategoryId: Joi.custom(validId).allow(null).messages({
    "any.invalid": "Invalid parent category ID format.",
  }),

  // ?==> Product
  productName: Joi.string().min(3).max(150).trim().messages({
    "string.base": "Product name must be a string.",
    "string.empty": "Product name cannot be empty.",
    "string.min": "Product name must be at least {#limit} characters long.",
    "string.max": "Product name cannot exceed {#limit} characters.",
    "any.required": "Product name is required.",
  }),
  price: Joi.number().min(1).required().messages({
    "number.base": "Price must be a number.",
    "number.min": "Price must be at least {#limit}.",
    "any.required": "Price is required.",
  }),
  categories: Joi.array()
    .items(Joi.custom(validId))
    .min(1)
    .required()
    .messages({
      "array.base": "Categories must be an array.",
      "array.min": "At least one category is required.",
      "any.required": "Categories are required.",
      "any.invalid": "Category ID Invalid format.",
    }),

  // ?==> Order
  orderUser: Joi.string().custom(validId).trim().messages({
    "string.base": "User ID must be a string.",
    "string.empty": "User ID  cannot be empty.",
    "any.invalid": "User ID Invalid format.",
  }),
  items: Joi.array()
    .items(
      Joi.object({
        product: Joi.string()
          .custom(validId)
          .trim()
          .messages({
            "string.base": "Product ID must be a string.",
            "string.empty": "Product ID  cannot be empty.",
            "any.invalid": "Product ID Invalid format.",
          })
          .required(),
        quantity: Joi.number().integer().positive().min(1).required(),
      })
    )
    .min(1)
    .messages({
      "array.base": "items must be an array.",
      "array.min": "At least one product is required.",
      "any.required": "items are required.",
    }),
};
