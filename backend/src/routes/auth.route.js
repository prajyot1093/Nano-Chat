import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

//router initialized
const router = express.Router();

// router created for login , logout and signup .
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

//router create to update Profile
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;