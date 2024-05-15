const RoomService = require("../../utils/rooms/RoomService");

const getRooms = (req, res) => {
  res.json(RoomService.instance.getRooms());
};

module.exports = getRooms;
