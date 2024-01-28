import express from "express";
import { test } from "../controller/user.controller.js";

const router = express.Router();

// router.get() is used to define routes in the application.
// test is a callback function that will be called when a GET request is made to the /api/user/ path.
router.get("/", test);

export default router;
