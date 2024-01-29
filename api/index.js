import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

// The app's logic can use this value to access the right set of resources or enable/disable certain features or sections of the app.
import dotenv from "dotenv";
dotenv.config();

// database connection in mongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.error(err));

// First step to connect express server
const app = express();

// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// userRoutes is a middleware function that will be called when a GET request is made to the /api/user/ path.
app.use("/api/user", userRoutes);

//authRoutes is a middleware function that will be called when a POST request is made to the /api/auth/ path.
app.use("/api/auth", authRoutes);

// error handling middleware function that will be called when an error occurs.
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
