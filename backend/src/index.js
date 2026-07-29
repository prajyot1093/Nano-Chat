import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();

//store server in a variable to perform operations
const app = express();

//middleware used to grab data for auth.controller
app.use(express.json());

//cookie parser middleware
app.use(cookieParser());

//use cors pkg to avoid cors error in ports in frontend and backend
app.use(cors(
{
    origin:"http://localhost5173",
   credentials:true,
}
))
//setting up PORT from .env
const PORT = process.env.PORT || 5001;

//Using AuthAPI route
app.use("/api/auth", authRoutes);
//message route
app.use("/api/message", messageRoutes);

//Calling connectDb function from lib/db.js
connectDB();

//listening server on PORT stored in .env
app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});