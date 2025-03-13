import { asyncHandler } from "./index.middlewares.js";
import { AppError, verifyToken } from "../utils/index.utils.js";
import { User } from "../database/models/index.models.js";

// ?==> Helpers
const validateToken = (token) => {
  try {
    const decoded = verifyToken(token);
    return { valid: true, expired: false, decoded };
  } catch {
    (error) => {
      if (error.name === "TokenExpiredError") {
        return {
          valid: false,
          expired: true,
          decoded: null,
          message: "Token expired.",
        };
      }
      return {
        valid: false,
        expired: false,
        decoded: null,
        message: "Invalid token.",
      };
    };
  }
};

// ?==> Middleware

/**
 * Middleware to authenticate users by validating JWT tokens.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Express next function.
 *
 * @returns {Promise<void>} Calls `next()` if authentication succeeds, otherwise passes an error.
 */
const auth = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.token || req.header("Authorization");
  console.log({ token });

  if (!token) return next(new AppError(401, "Unauthorized: No token found."));

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  // Validate token
  const { valid, decoded, message } = validateToken(token);
  if (!valid) return next(new AppError(401, `Unauthorized: ${message}`));

  // Check if user exists
  const user = await User.findById(decoded._id);
  if (!user) return next(new AppError(401, "Unauthorized: User not found."));

  // Attach user to request
  req.user = user;
  next();
});

/**
 * Middleware to check if the user has one of the allowed roles.
 * @param  {...string} allowedRoles - The roles that are allowed to access the route.
 * @return {Function} A middleware function that checks if the user has one of the allowed roles.
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new AppError(403, "Access denied"));
    }
    next();
  };
};

export { auth, authorizeRoles };
