import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";

//store server in a variable to perform operations
const app = express();

//middleware used to grab data for auth.controller
app.use(express.json())

//setting up PORT from .env
dotenv.config()
const PORT = process.env.PORT


//listening server on PORT stored in .env
app.listen(PORT,()=>{
    console.log("Server is running at  "+PORT)
})


//Using AuthAPI route
app.use("/api/auth",authRoutes)

//Calling connectDb function from lib/db.js
connectDB()