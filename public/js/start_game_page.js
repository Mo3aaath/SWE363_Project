import { bluePage } from "../main.js";
import { backBtn } from "./components/back_btn.js";
import { gamepage, joinGamePage } from "./join_game_page.js";
export function createRoomPage() {
  const startGameP = document.createElement("div");
  startGameP.className = "startGamePage page";
  const html = `
    <form action="" method="post">
  <div class="divFlex opt" id="formFlex">
      <!-- Room Name Input -->
      <div class="inputFlex">
          <label for="roomName">Room Name</label>
          <input type="text" name="roomName" id="roomName" placeholder="Ana 3mk">
      </div>
      
      <!-- Type Dropdown -->
      <div class="inputFlex">
          <label for="type">Type</label>
          <select name="type">
              <option value="MCQ">MCQ</option>
              <!-- Add more options here if needed -->
          </select>
      </div>

      <!-- Players Dropdown -->
      <div class="inputFlex">
          <label for="players">Players</label>
          <input type="number" name="players" id="players" min="2" max="8" value="2">
      </div>
  </div>

  <!-- Create Button -->
  <input type="submit" name="create" id="create" value="CREATE">
</form>
    `;
  const oldContent = bluePage.children[0];
  oldContent.remove();

  startGameP.innerHTML = html;

  startGameP.appendChild(backBtn(oldContent, startGameP));
  bluePage.appendChild(startGameP);

  const createBt = startGameP.querySelector("#create");
  const gameName = startGameP.querySelector("#roomName");
  const capacity = startGameP.querySelector("#players");
  createBt.addEventListener("click", async (e) => {
    e.preventDefault();
    // Create a new room
    try {
      const oldContent = startGameP.children[0];
      oldContent.remove();

      startGameP.innerHTML = `<h2>Waiting for ${
        (+capacity.value || 4) - 1
      } more players...</h2>`;
      const room = await createRoom(gameName.value, capacity.value);
      gamepage(room.questions);
    } catch (err) {
      console.error(err);
    }
  });
}

async function createRoom(name, capacity) {
  const response = await fetch("/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify({ name, capacity }),
  });
  const data = await response.json();

  return data;
}