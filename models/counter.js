// counter for logging in users

const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      required: [true, "Counter is required"],
    },
  },
  { timestamps: true }
);

const Counter = mongoose.model("counter", counterSchema);

module.exports = Counter;
