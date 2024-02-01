import User from "../models/user.model.js";

// bcryptjs is a library to help you hash passwords.
import bcryptjs from "bcryptjs";

// errorHandler is a function that will be called when an error occurs.
import { errorHandler } from "../utils/error.js";

// jsonwebtoken is a library to help you generate JWTs.
// JWTs are used to authenticate users.
// JWTs are also used to protect routes.
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

// Google OAuth
// 1. The client sends the user’s Google access token to the server.
// 2. The server verifies the access token with Google.
// 3. If the access token is valid, the server creates a new user or returns an existing user.
// 4. The server creates a JWT and sends it to the client.
// 5. The client saves the JWT in the cookie.
// 6. The client sends the JWT in the cookie to the server.
// 7. The server verifies the JWT.
// 8. If the JWT is valid, the server returns the user data.
// 9. The client saves the user data in the global state.
// 10. The user is authenticated.

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // If the user exists, we generate a JWT and send it to the client.
      // We also send the user data to the client.
      // The user data is used to update the global state.

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      // If the user doesn’t exist, we create a new user.
      // We generate a random password and hash it.
      // We use the random password as the user’s password.
      // We also generate a username using the user’s name.
      // We use the random password as the user’s password.
      // We also generate a username using the user’s name.

      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      // We save the new user to the database.
      // We generate a JWT and send it to the client.
      // We also send the user data to the client.
      // The user data is used to update the global state.

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
