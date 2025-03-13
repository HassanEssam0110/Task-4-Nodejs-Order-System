import {
  NotFoundHandler,
  globalErrorHandler,
} from "../middlewares/index.middlewares.js";
import {
  authRouter,
  categoryRouter,
  productRouter,
  orderRouter,
} from "./index.modules.js";

const bootstrap = (app) => {
  app.get("/", (req, res, next) => {
    return res.status(200).json({
      message: "Server is running",
    });
  });

  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/orders", orderRouter);

  // Middleware to handle not found routes
  app.use("*", NotFoundHandler);

  // Middleware to handle global errors
  app.use(globalErrorHandler);
};

export default bootstrap;
