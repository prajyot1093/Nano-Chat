//protectRoute middleware

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

//created protectRoute Middleware
//protectRoute is used to verify that profile exists while updating comparing userId 
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error in protectRoute : ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};