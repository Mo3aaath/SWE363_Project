const User = require("../../models/user");
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

const getLeaderBoard = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ points: -1 })
      .limit(10)
      .select("name points imageId");
    res.json({ users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = getLeaderBoard;
