const User = require("../../models/user");
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

// get all friends
const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("friends", "name imageId");
    res.json({ friends: user.friends });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// add friend
const addFriend = async (req, res) => {
  const { friendName } = req.body;

  if (!friendName) {
    return res.status(400).json({ message: "friendName is required" });
  }

  if (friendName === req.user.name) {
    return res
      .status(400)
      .json({ message: "You can't add yourself as a friend" });
  }

  try {
    const friend = await User.findOne({ name: friendName }).select("name imageId")
    if (!friend) {
      return res
        .status(404)
        .json({ message: `user of name ${friendName} does not exist` });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $addToSet: { friends: friend._id },
      },
      { new: true }
    );

    res.json({ message: "friend added", friend });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getFriends, addFriend };
