import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

//store server in a variable to perform operations
const app = express();

//middleware used to grab data for auth.controller
app.use(express.json());

//cookie parser middleware
app.use(cookieParser());

//setting up PORT from .env
const PORT = process.env.PORT || 5001;

//Using AuthAPI route
app.use("/api/auth", authRoutes);

//Calling connectDb function from lib/db.js
connectDB();

//listening server on PORT stored in .env
app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});