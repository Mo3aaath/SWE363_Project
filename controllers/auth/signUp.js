const User = require("../../models/user");

const createToken = require("../../utils/jwt/create");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function sign_up(req, res, next) {

  const { name, password, email, dateOfBirth } = req.body;

  try {
    const user = await User.create({
      name: name,
      password: password,
      email: email,
      dateOfBirth: dateOfBirth,
    });
    res.json({
      message: "you have been succsefully added",
      token: createToken(user._id, name),
      user: user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = sign_up;
