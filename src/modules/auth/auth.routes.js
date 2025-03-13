import { Router } from "express";
import { checkUserExist } from "./auth.utils.js";
import { roles } from "../../utils/index.utils.js";
import * as middleware from "../../middlewares/index.middlewares.js";
import * as controller from "./auth.controller.js";
import * as schema from "./auth.schema.js";

const authRouter = Router();

authRouter.post(
  "/register",
  middleware.validator(schema.registerSchema),
  checkUserExist,
  controller.register
);

authRouter.post(
  "/login",
  middleware.validator(schema.loginSchema),
  controller.login
);

authRouter.get(
  "/me",
  middleware.auth,
  middleware.authorizeRoles(roles.ADMIN, roles.MODERATOR, roles.USER),
  controller.getMe
);

export { authRouter };
