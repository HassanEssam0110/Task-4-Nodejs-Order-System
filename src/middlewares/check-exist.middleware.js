import { AppError } from "../utils/index.utils.js";
import { asyncHandler } from "./index.middlewares.js";

const checkExist = (Model, fieldName) => {
  return asyncHandler(async (req, res, next) => {
    const fieldValue =
      req.body[fieldName] || req.params[fieldName] || req.query[fieldName];

    const isExist = await Model.findOne({ [fieldName]: fieldValue });
    if (isExist)
      return next(
        new AppError(400, `${fieldName}: ${fieldValue} already exist`)
      );

    next();
  });
};

const checkNotExist = (Model, fieldName) => {
  return asyncHandler(async (req, res, next) => {
    const fieldValue =
      req.body[fieldName] || req.params[fieldName] || req.query[fieldName];
    console.log({ [fieldName]: fieldValue });

    const isExist = await Model.findOne({ [fieldName]: fieldValue });
    if (!isExist)
      return next(
        new AppError(404, `${fieldName}: ${fieldValue} is not exist`)
      );

    next();
  });
};

export { checkExist, checkNotExist };
