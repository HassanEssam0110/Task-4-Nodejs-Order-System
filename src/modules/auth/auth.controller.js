import config from "../../../config/config.js";
import { User } from "../../database/models/index.models.js";
import { asyncHandler } from "../../middlewares/index.middlewares.js";
import {
  createToken,
  compareHash,
  roles,
  AppError,
} from "../../utils/index.utils.js";

const sendResponseWithToken = (user, statusCode, res) => {
  const token = createToken({ _id: user._id });
  const cookieOptions = {
    expires: new Date(
      Date.now() + parseInt(config.JWT_COOKIES_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Prevents access to cookies via JavaScript (XSS protection)
    sameSite: "Strict", // Prevents CSRF attacks
  };

  // Ensures cookies are sent over HTTPS
  if (config.NODE_ENV !== "production") {
    cookieOptions.secure = false; // ✅ Allow HTTP in development
  }

  res.cookie("token", token, cookieOptions);
  return res
    .status(statusCode)
    .json({ status: "success", data: { token, user } });
};

const register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.create({
    username,
    email,
    password,
    role: roles.USER,
  });

  user.password = undefined;
  return sendResponseWithToken(user, 201, res);
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await compareHash(password, user.password))) {
    return next(new AppError(401, "invalid credentials"));
  }

  user.password = undefined;
  return sendResponseWithToken(user, 200, res);
});

const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  return res.status(200).json({ status: "success", data: { user } });
});


export { register, login, getMe };
