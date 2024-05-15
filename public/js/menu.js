import { editProfilePage } from "./profile_page.js";
import { leaderBoardsPage } from "./leader_Boards_Page.js";
import { friendsPage } from "./friends_page.js";
import { joinGamePage } from "./join_game_page.js";
import { createRoomPage } from "./start_game_page.js";
import { bluePage, user } from "../main.js";

const menuP = document.createElement("div");

export function menuPage() {
  menuP.className = "menuPage page";
  const html = `<div class="divFlex">
                    <div id="profile" class="menuBox opt">Profile</div>
                    <div id="LeaderBoards" class="menuBox opt">LeaderBoards</div>
                    <div id="friends" class="menuBox opt">Friends</div>
                    <div id="joingame" class="menuBox opt">Join Game</div>
                    <div id="startGame" class="menuBox opt">craete room</div>
                    <div id="logout" class="menuBox opt">Logout</div>
                </div>`;

  const oldContent = bluePage.children[0];
  oldContent.remove();

  menuP.innerHTML = html;
  //   loginP.appendChild(backBtn(oldContent, loginP));
  bluePage.appendChild(menuP);

  const profileBtn = menuP.querySelector("#profile");
  const leaderBoardsBtn = menuP.querySelector("#LeaderBoards");
  const friendsBtn = menuP.querySelector("#friends");
  const joingameBtn = menuP.querySelector("#joingame");
  const startGameBtn = menuP.querySelector("#startGame");
  const logoutBtn = menuP.querySelector("#logout");

  logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });

  profileBtn.addEventListener("click", () => editProfilePage(user));

  leaderBoardsBtn.addEventListener("click", leaderBoardsPage);
  friendsBtn.addEventListener("click", friendsPage);
  joingameBtn.addEventListener("click", joinGamePage);
  startGameBtn.addEventListener("click", createRoomPage);
}
