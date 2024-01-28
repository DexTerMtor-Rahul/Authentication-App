import express from "express";
import mongoose from "mongoose";

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
