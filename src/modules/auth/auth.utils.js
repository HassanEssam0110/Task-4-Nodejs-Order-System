import { asyncHandler } from "../../middlewares/index.middlewares.js";
import { User } from "../../database/models/index.models.js";
import { AppError } from "../../utils/index.utils.js";

const checkUserExist = asyncHandler(async (req, res, next) => {
  const { email, username } = req.body;
  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (user) return next(new AppError(409, `user name or email already exist.`));
  next();
});

export { checkUserExist };
