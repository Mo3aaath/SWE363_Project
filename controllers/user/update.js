// update user data

const User = require("../../models/user");
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

const updateUser = async (req, res) => {
  const { name, email, birth, bio } = req.body;

  const updateObject = {};

  if (name) updateObject.name = name;
  if (email) updateObject.email = email;
  if (birth) updateObject.birth = birth;
  if (bio) updateObject.bio = bio;

  try {
    const user = await User.findByIdAndUpdate(req.user.id, updateObject, {
      new: true,
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = updateUser;
