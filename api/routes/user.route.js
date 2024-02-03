import express from "express";
import { test, updateUser, deleteUser } from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// router.get() is used to define routes in the application.
// test is a callback function that will be called when a GET request is made to the /api/user/ path.
router.get("/", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
