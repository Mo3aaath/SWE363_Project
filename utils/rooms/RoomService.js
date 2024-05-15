const Room = require("./Room");

class RoomService {
  static instance = new RoomService();
  constructor() {
    this.rooms = [];
  }

  addRoom(room) {
    this.rooms.push(room);
  }

  removeRoom(roomId) {
    this.rooms = this.rooms.filter((room) => room.id !== roomId);
  }

  getRoom(roomId) {
    return this.rooms.find((room) => room.id === roomId);
  }

  getRooms() {
    return this.rooms.map((room) => room.serialize());
  }

  serialize() {
    return this.rooms.map((room) => room.serialize());
  }
}

module.exports = RoomService;
