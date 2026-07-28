import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessages,
} from "../controllers/message.controller.js";

const router = express.Router();

// Get all users except the logged-in user
router.get("/users", protectRoute, getUsersForSidebar);

// Get messages with a specific user
router.get("/:id", protectRoute, getMessages);

// Send a message to a specific user
router.post("/:id", protectRoute, sendMessages);

export default router;