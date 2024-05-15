import { User } from "./User.js";
import { getFactFromServer } from "./getFactFromServer.js";
import { loginPage } from "./js/login_register_page.js";
import { registerPage } from "./js/login_register_page.js";
import { menuPage } from "./js/menu.js";

const factsBlock = document.querySelectorAll(".facts-block");
const nav = document.querySelector("#navigationDiv");

export const user = new User(); // null user

try {
  user.update(JSON.parse(localStorage.getItem("user")));
} catch (error) {
  localStorage.clear();
}
// const bluePage

const firstFunFact = await getFactFromServer("Fun");
const firstDarkFact = await getFactFromServer("Dark");

// looping over all blocks
factsBlock.forEach((block) => {
  block.addEventListener("click", async (e) => {
    e.stopPropagation();
    factsBlock.forEach((activeBlock) =>
      activeBlock.classList.remove("active", "show")
    );
    block.classList.add("active");

    // checking which block is clicked
    if ((e.target.id === "funFact") | (e.target.id === "funFactBt")) {
      darkFact.style.cssText = "";
      darkFact.innerHTML = `            DARK FACT
      <button type="button" id="darkFactBt" class="start-button">START</button>`;

      bluePage.innerHTML = `<div class="logo main-logo" id="logo">LOGO</div>`;
      // funFactPage();

      funFactPage(firstFunFact);
    } else if ((e.target.id === "darkFact") | (e.target.id === "darkFactBt")) {
      funFact.style.cssText = "";
      funFact.innerHTML = `            FUN FACT
      <button type="button" id="funFact" class="start-button">START</button>`;

      bluePage.innerHTML = `<div class="logo main-logo" id="logo">LOGO</div>`;

      darkFactPage(firstDarkFact);
    } else if (e.target.id === "navigationDiv" || e.target.id === "logo") {
      funFact.style.cssText = "";
      darkFact.style.cssText = "";

      funFact.innerHTML = `            FUN FACT
      <button type="button"  id="funFactBt" class="start-button">START</button>`;
      darkFact.innerHTML = `            DARK FACT
      <button type="button" id="darkFactBt" class="start-button">START</button>`;

      if (user.name) menuPage();
      else authOptionsPage();
    }
  });
});

function authOptionsPage() {
  bluePage.innerHTML = `<div class="divFlex">

  <div id="loginBtn" class="menuBox opt">LOGIN</div>
  <div id="registerBtn" class="menuBox opt">REGISTER</div>

<!-- Logo label -->
<div class="logo main-logo" id="logo">LOGO</div>
</div>`;

  const loginBtn = bluePage.querySelector("#loginBtn");
  const registerBtn = bluePage.querySelector("#registerBtn");
  loginBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    loginPage();
  });
  registerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    registerPage();
  });
}

export const bluePage = document.querySelector("#navigationDiv");
const funFact = document.querySelector("#funFact");
const darkFact = document.querySelector("#darkFact");

/**
 *
 * @param {Fact} fact
 */
function funFactPage(fact, index = 0) {
  funFact.innerHTML = "";
  const container = document.createElement("div");
  // Create the Fun Fact Page
  container.className = "funFactPage page";
  // funFact.style.padding = "0";
  container.innerHTML = `

  <div class="fact-container">
        <div class="img-container"><img id="fun-img" src="/uploads/fun/${fact.imgUrl}" alt="Fun fact image"></div>
        <div class="overlay">
            <p id="fun-paragraph">${fact.text}</p>
            <button id="next-bt-fun" type="button">Next</button>
        </div>
    </div>
  `;

  funFact.appendChild(container);
  const nextBtFun = document.getElementById("next-bt-fun");
  const funParagraph = document.getElementById("fun-paragraph");
  const funImg = document.getElementById("fun-img");

  nextBtFun.addEventListener("click", async (e) => {
    e.stopPropagation();

    const fact = await getFactFromServer("Fun", index + 1);
    funFactPage(fact, index + 1);
  });
}

/**
 * @param {Fact} fact
 */
function darkFactPage(fact, index = 0) {
  darkFact.innerHTML = "";
  // Create the Dark Fact Page
  const container = document.createElement("div");
  container.className = "darkFactPage page";
  darkFact.style.padding = "0";
  container.innerHTML = `
  <div class="fact-container">
        <div class="img-container"><img src="/uploads/dark/${fact.imgUrl}" alt="Fun fact image"></div>
        <div class="overlay">
            <p id="dark-paragraph">${fact.text}</p>
            <button id="next-bt-dark" type="button">Next</button>
        </div>
    </div>
  `;
  darkFact.appendChild(container);
  const nextBtDark = document.getElementById("next-bt-dark");
  const darkParagraph = document.getElementById("dark-paragraph");
  const darkImg = document.getElementById("dark-img");

  nextBtDark.addEventListener("click", async (e) => {
    e.stopPropagation();

    const fact = await getFactFromServer("Dark", index + 1);
    darkFactPage(fact, index + 1);
  });
}

function resetBluePage() {
  bluePage.innerHTML = `<div class="logo main-logo" id="logo">LOGO</div>`;
}
