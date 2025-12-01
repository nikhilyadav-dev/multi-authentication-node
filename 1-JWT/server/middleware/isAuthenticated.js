import { wrapAsync } from "./wrapAsync.js";
import ErrorHandler from "./error.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const isAuthentiCated = wrapAsync(async (req, res, next) => {
  const { token } = req.cookies;
  console.log("Token", token);
  if (!token) {
    return next(new ErrorHandler("User is not authenticated", 400));
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log("decode", decode);
  req.user = await User.findById(decode.id);
  next();
});
