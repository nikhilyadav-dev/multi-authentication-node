import { wrapAsync } from "./wrapAsync.js";
import ErrorHandler from "./error.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const isAuthentiCated = wrapAsync(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User is not authenticated", 400));
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decode.id);
  next();
});
