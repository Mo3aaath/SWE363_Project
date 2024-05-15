const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
    unique: [true, "This username is already taken"],
    minlength: [2, "Username must be at least 2 characters long"],
    lowercase: true,
    trim: true,
    match: [/^[a-zA-Z0-9]+$/, "Username must contain only letters and numbers"],
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: [true, "This email is already taken"],
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    require: [true, "Date of birth is required"],
  },
  password: {
    select: false,
    type: String,
    require: [true, "Password is required"],
    trim: true,
    minlength: [8, "Password must be at least 8 characters long"],
    match: [
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain at least one letter, one number and one special character",
    ],
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [100, "Bio must be at most 100 characters long"],
    default: `Hello, I'm new here!`,
  },
  imageId: {
    type: String,
  },
  friends: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  points: {
    type: Number,
    default: 0,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
