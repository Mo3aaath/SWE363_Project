import { bluePage } from "../main.js";
import { backBtn } from "./components/back_btn.js";


export async function leaderBoardsPage() {
  // Create the Leader Boards Page
  const leaderBoardsPage = document.createElement("div");
  leaderBoardsPage.className = "leaderBoardsPage page";
  leaderBoardsPage.innerHTML = `
        <div id="formFlex" class="formFlex3 opt" ">
            <h3 id="top200">Top 10</h3>
            <div id="playersList"></div>
        </div>
    `;

  const playersList = leaderBoardsPage.querySelector("#playersList"); // Correct method to select within newly created element

  const leaderBoard = await getLeaderBoard(); // Get the leader board from the server

  leaderBoard.forEach((e, index) => {
    const player = document.createElement("div");
    player.className = "player";
    player.innerHTML = `
		<p>${index + 1}. </p>
            <span>
                <img src="/assists/images/user.svg" alt="" height="30px"> 
								<p>${e.name}</p>
								<small>${e.points}</small> 
            </span>`;
    playersList.appendChild(player);
  });

  const oldContent = bluePage.children[0];
  oldContent.remove();

  leaderBoardsPage.appendChild(backBtn(oldContent, leaderBoardsPage));
  bluePage.appendChild(leaderBoardsPage);
}

async function getLeaderBoard() {
  // Get the leader board from the server
  const response = await fetch("/LeaderBoard", {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  const data = await response.json();
  return data["users"];
}