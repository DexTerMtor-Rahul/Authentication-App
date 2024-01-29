// signup controller for auth route
import User from "../models/user.model.js";
// bcrypt is used to hash the password before saving it to the database so that no one can see the password.
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 12);
  const user = new User({ username, email, password: hashPassword });
  try {
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
