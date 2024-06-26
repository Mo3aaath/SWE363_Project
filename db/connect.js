const mongoose = require("mongoose");

const connect = async () => {
  return await mongoose.connect(process.env.MONGODB_URI);
};

module.exports = connect;
