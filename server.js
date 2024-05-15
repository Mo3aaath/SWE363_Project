const express = require("express");
const dotenv = require("dotenv");
const connect = require("./db/connect");

const getFact = require("./controllers/Facts/getFact");

const sign_up = require("./controllers/auth/signUp");
const logIn = require("./controllers/auth/logIn");
const updateUser = require("./controllers/user/update");
const verify = require("./middleware/auth");
const getLeaderBoard = require("./controllers/user/leaderBord");
const Counter = require("./models/counter");
const { addFriend, getFriends } = require("./controllers/Friends/addFriend");
const getRooms = require("./controllers/rooms/getRooms");
const createRoom = require("./controllers/rooms/createRoom");
const joinRoom = require("./controllers/rooms/joinRoom");

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/fact", getFact);
app.post("/signUp", sign_up);
app.post("/logIn", logIn, requestTracker);
app.get("/LeaderBoard", getLeaderBoard);
app.get("/friends", verify, getFriends);
app.post("/friends", verify, addFriend);
app.patch("/update", verify, updateUser);
app.get("/rooms", getRooms);
app.post("/rooms", verify, createRoom);
app.post("/rooms/:roomId", verify, joinRoom);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    await connect();

    console.log("Server is running on port 3000");
  } catch (error) {
    console.log(error);
  }
});

async function requestTracker() {
  try {
    const count = await Counter.findOneAndUpdate(
      {},
      { $inc: { count: 1 } },
      { upsert: true }
    );
    console.log("Login Request count: ", count.count + 1);
  } catch (error) {
    console.log(error.message);
  }
}
