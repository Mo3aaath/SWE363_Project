// create room

const Room = require("../../utils/rooms/Room");
const RoomService = require("../../utils/rooms/RoomService");
const { v4 } = require("uuid");

const createRoom = async (req, res) => {
  const { name, capacity } = req.body;
  const username = req.user.name;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  try {
    const room = new Room(v4(), name, +capacity || 4);
    RoomService.instance.addRoom(room);

    room.addUser(username , res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = createRoom;
