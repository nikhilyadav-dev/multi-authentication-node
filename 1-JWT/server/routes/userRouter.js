import express from "express";
import { isAuthentiCated } from "../middleware/isAuthenticated.js";
import {
  register,
  verifyOTP,
  login,
  logout,
} from "../controllers/userControllers.js";

const router = express.Router();
router.post("/register", register);
router.post("/otp-verification", verifyOTP);
router.post("/login", login);
router.get("/logout", isAuthentiCated, logout);

export default router;
