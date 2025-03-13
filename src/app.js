import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "../config/config.js";

import bootstrap from "./modules/bootstrap.modules.js";

const app = express();

/* Middlewares */
if (config.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // ✅ Allows cookies to be sent
  })
);
app.use(express.json({ limit: "100kb" })); // ✅ Parse JSON
app.use(cookieParser()); // ✅ Parse cookies

/* Routes */
bootstrap(app);

export default app;
