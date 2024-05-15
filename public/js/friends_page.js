import { bluePage } from "../main.js";
import { backBtn } from "./components/back_btn.js";


// Function to display friends page
export async function friendsPage() {
  const friendsP = document.createElement("div");
  friendsP.className = "friendsPage page";
  friendsP.innerHTML = `
    <div id="formFlex" class="formFlex3 opt" ">
            <h3 id="top200">Friends</h3>
            <div class="inputFlex">
              <input  type="text" name="friendName"  placeholder="friend name">
              <button id="addFriend" class="add-friend-btn">Add Friend</button>
            </div>

            <div id="playersList"></div>
        </div>
        `;

  const addFriend = friendsP.querySelector("#addFriend");

  addFriend.addEventListener("click", async () => {
    const friendName = friendsP.querySelector("input[name='friendName']").value;
    const response = await fetch("/Friends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ friendName }),
    });
    const data = await response.json();
    if (response.ok) {
      friendsP.querySelector("input[name='friendName']").value = "";
      friendsP.querySelector("#playersList").innerHTML += `
        <div class="player">
            <p>1. </p>
            <span style="display: flex; justify-content: start;">
                <img src="/assists/images/user.svg" alt="" height="30px"> 
                <p>${friendName}</p>
            </span>
        </div>
        `;
    } else {
      alert(data.message);
    }
  });

  const playersList = friendsP.querySelector("#playersList"); // Correct method to select within newly created element

  const leaderBoard = await getFriends(); // Get the leader board from the server

  leaderBoard.forEach((e, index) => {
    const player = document.createElement("div");
    player.className = "player";
    player.innerHTML = `
		<p>${index + 1}. </p>
            <span style="display: flex; justify-content: start;">
                <img src="/assists/images/user.svg" alt="" height="30px"> 
								<p>${e.name}</p>
            </span>`;
    playersList.appendChild(player);
  });
  // Removing the old content from bluePage
  const oldContent = bluePage.children[0];
  oldContent.remove();

  friendsP.appendChild(backBtn(oldContent, friendsP));
  bluePage.appendChild(friendsP);
}

// Function to get friends from the server
async function getFriends() {
  // Get the friends from the server
  const response = await fetch("/Friends", {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  const data = await response.json();
  return data["friends"];
}