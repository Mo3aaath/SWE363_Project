// join room

const RoomService = require("../../utils/rooms/RoomService");

const joinRoom = (req, res) => {
  const { roomId } = req.params;
  const username = req.user.name;
  try {
    const room = RoomService.instance.getRoom(roomId);
    if (!room) {
      throw new Error("Room not found");
    }
    if (room.users.length >= room.capacity) {
      throw new Error("Room is full");
    }

    if (room.users.includes(username)) {
      throw new Error("User already in the room");
    }

    room.addUser(username, res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = joinRoom;
