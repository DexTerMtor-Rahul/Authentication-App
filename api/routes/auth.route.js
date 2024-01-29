import express from "express";
import { signup } from "../controller/auth.controller.js";

const router = express.Router();

// post() is used to send data to a server to create/update a resource.
router.post("/signup", signup);

export default router;
