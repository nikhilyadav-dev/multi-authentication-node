import express from "express";
import { isAuthentiCated } from "../middleware/isAuthenticated.js";
import {
  register,
  verifyOTP,
  login,
  logout,
  getUser,
  forgotPassword,
  resetPassword,
} from "../controllers/userControllers.js";

const router = express.Router();
router.post("/register", register);
router.post("/otp-verification", verifyOTP);
router.post("/login", login);
router.get("/logout", isAuthentiCated, logout);
router.get("/me", isAuthentiCated, getUser);
router.post("/password/forgot", forgotPassword);
router.post("/password/reset/:resetToken", resetPassword);

export default router;
