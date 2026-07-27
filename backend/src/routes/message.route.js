import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router()
//get users route 
router.get("/users",protectRoute,getUsersForSidebar)
//get messages from user id 
router.get("/:id",protectRoute,getMessages)
//post method to send messages 
router.post("/:id",protectRoute,sendMessage)
export default router;
