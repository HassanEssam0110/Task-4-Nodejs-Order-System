import { Category } from "../../database/models/index.models.js";
import { asyncHandler } from "../../middlewares/index.middlewares.js";
import { AppError } from "../../utils/index.utils.js";

// Check if the parent category exists
const checkParentCategoryExist = asyncHandler(async (req, res, next) => {
  const { parentCategoryId } = req.body;

  if (!parentCategoryId) return next();

  const category = await Category.findOne({
    _id: parentCategoryId,
    inDeleted: { $ne: true },
  });

  if (category) return next();

  next(new AppError(404, "Parent Category not found"));
});

export { checkParentCategoryExist };
