import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials!"));
    }
    // jwt.sign() method takes three parameters: payload, secretOrPrivateKey, and options.
    // payload: data to be stored in the token
    // secretOrPrivateKey: secret used to sign the token
    // options: algorithm, expiresIn (expiry time), issuer, audience, etc.
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // The _doc property contains the document returned by the query.
    // We use the spread operator to extract the password from the document.
    // We don’t want to send the password to the client.
    // We only need the id, username, and email.
    const { password: userPassword, ...rest } = validUser._doc;

    // We set the token in the cookie and send the user data to the client.
    // The cookie is set to be httpOnly so that it can’t be accessed using JavaScript.
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
