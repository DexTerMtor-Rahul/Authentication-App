// signup controller for auth route
import User from "../models/user.model.js";
// bcrypt is used to hash the password before saving it to the database so that no one can see the password.
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 12);
  const user = new User({ username, email, password: hashPassword });
  try {
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
