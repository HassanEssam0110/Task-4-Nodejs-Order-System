// Handle Uncaught Exceptions
process.on("uncaughtException", (error) => {
  console.error(`Error uncaughtException: ${error.name} - ${error.message} `);
  process.exit(1);
});

import app from "./src/app.js";
import connectDB from "./src/database/db-connect.js";
import config from "./config/config.js";

connectDB();

const server = app.listen(config.PORT, () => {
  console.log(
    `Server is running on port ${config.PORT} - ${config.NODE_ENV} Mode`
  );
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (error) => {
  console.error(
    `${new Date().toUTCString()} Error unhandledRejection: ${error.name} - ${
      error.message
    } `
  );
  server.close(() => process.exit(1)); // Gracefully close server
});
