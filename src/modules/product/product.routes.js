import { Router } from "express";
import { Product } from "../../database/models/index.models.js";
import { roles } from "../../utils/index.utils.js";
import * as middleware from "../../middlewares/index.middlewares.js";
import * as controller from "./product.controller.js";
import * as schema from "./product.schema.js";

const productRouter = Router();
productRouter
  .route("/")
  .get(controller.getProducts)
  .post(
    middleware.auth,
    middleware.authorizeRoles(roles.ADMIN, roles.MODERATOR),
    middleware.validator(schema.createProductSchema),
    middleware.checkExist(Product, "name"),
    controller.createProduct
  );

productRouter
  .route("/:id")
  .get(middleware.validator(schema.getProductSchema), controller.getProduct)
  .put(
    middleware.auth,
    middleware.authorizeRoles(roles.ADMIN, roles.MODERATOR),
    middleware.validator(schema.updateProductSchema),
    middleware.checkExist(Product, "name"),
    controller.updateProduct
  )
  .delete(
    middleware.auth,
    middleware.authorizeRoles(roles.ADMIN),
    middleware.validator(schema.deleteProductSchema),
    controller.deleteProduct
  );

export { productRouter };
