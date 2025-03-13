import { Router } from "express";
import { roles } from "../../utils/index.utils.js";
import * as controller from "./order.controller.js";
import * as middleware from "../../middlewares/index.middlewares.js";
import * as schema from "./order.schema.js";

const orderRouter = Router();

orderRouter
  .route("/")
  .get(
    middleware.auth,
    middleware.authorizeRoles(roles.ADMIN, roles.MODERATOR),
    controller.getAllOrders
  )
  .post(
    middleware.auth,
    middleware.authorizeRoles(roles.USER),
    middleware.validator(schema.createOrderSchema),
    controller.createOrder
  );

orderRouter
  .route("/:id")
  .get(
    middleware.auth,
    middleware.authorizeRoles(roles.ADMIN, roles.MODERATOR, roles.USER),
    middleware.validator(schema.getOrderSchema),
    controller.getOrder
  )
  .put(
    middleware.auth,
    middleware.authorizeRoles(roles.ADMIN, roles.MODERATOR, roles.USER),
    middleware.validator(schema.updateOrderSchema),
    controller.updateOrder
  )
  .delete(
    middleware.auth,
    middleware.authorizeRoles(roles.ADMIN),
    middleware.validator(schema.deleteOrderSchema),
    controller.deleteOrder
  );

export { orderRouter };
