const mongoose = require("mongoose");

const factSchema = new mongoose.Schema({
  englishFact:{
    type: String,
    required: [true, "English Fact is required"],
  },
  arabicFact: {
    type: String,
    required: [true, "Arabic Fact is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
    enum: {
      values: ["Dark", "Fun"],
      message: "Type must be either Dark or Fun",
    }
  },
  imageId: {
    type: String,
    required: [true, "Image ID is required"],
  },
});
const Fact = mongoose.model("fact", factSchema);

module.exports = Fact;