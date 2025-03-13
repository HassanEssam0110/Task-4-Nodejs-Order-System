import { Router } from "express";
import { Category } from "../../database/models/index.models.js";
import { roles } from "../../utils/index.utils.js";
import { checkParentCategoryExist } from "./category.utils.js";
import * as middleware from "../../middlewares/index.middlewares.js";
import * as controller from "./category.controller.js";
import * as schema from "./category.schema.js";

const categoryRouter = Router();

categoryRouter
  .route("/")
  .get(controller.getCategories)
  .post(
    middleware.auth,
    middleware.authorizeRoles(roles.ADMIN, roles.MODERATOR),
    middleware.validator(schema.createCategorySchema),
    middleware.checkExist(Category, "name"),
    checkParentCategoryExist,
    controller.createCategory
  );
categoryRouter
  .route("/:id")
  .get(middleware.validator(schema.getCategorySchema), controller.getCategory)
  .put(
    middleware.auth,
    middleware.authorizeRoles(roles.ADMIN, roles.MODERATOR),
    middleware.validator(schema.updateCategorySchema),
    middleware.checkExist(Category, "name"),
    checkParentCategoryExist,
    controller.updateCategory
  )
  .delete(
    middleware.auth,
    middleware.authorizeRoles(roles.ADMIN),
    middleware.validator(schema.deleteCategorySchema),
    controller.deleteCategory
  );

export { categoryRouter };
