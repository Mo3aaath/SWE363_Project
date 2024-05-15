// make the login

const User = require("../../models/user");

const bcrypt = require("bcryptjs");
const createToken = require("../../utils/jwt/create");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

async function logIn(req, res, next) {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name: name }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "wrong password" });
    }
    res.json({
      message: "you have been succsefully logged in",
      token: createToken(user._id, name),
      user: user,
    });
    next();
  
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = logIn;
