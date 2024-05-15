import { bluePage, user } from "../main.js";
import { menuPage } from "./menu.js";

export function loginPage() {
  const loginP = document.createElement("div");
  loginP.className = "loginPage page";
  const html = `<form action="" method="post">
          <div id="formFlex" class="opt">
              <div id="formFlex2">
              <div class="inputFlex"><label for="userName">USERNAME </label><input type="text" name="userName" placeholder="Enter your username..."></div>
              <div class="inputFlex"><label for="password">PASSWORD </label><input type="password" name="password" placeholder="Enter your password..."></div>
          </div>
          </div>
          
          <div id = "LoginBt">
          <input class="opt" type="submit" name="submit" id="submit" value="LOGIN">
        </div>
        </form>`;

  const oldContent = bluePage.children[0];
  oldContent.remove();

  loginP.innerHTML = html;
  //   loginP.appendChild(backBtn(oldContent, loginP));
  bluePage.appendChild(loginP);

  const form = loginP.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userName = form.querySelector("input[name='userName']").value;
    const password = form.querySelector("input[name='password']").value;

    try {
      await login(userName, password);
      menuPage();
    } catch (error) {
      alert(error.message);
    }
  });
}

export function registerPage() {
  const registerP = document.createElement("div");
  registerP.className = "registerPage page";
  const html = `<form action="" method="post">
  <div class="divFlex opt" id="formFlex">
      <div class="inputFlex"><label for="userName">USERNAME </label><input type="text" name="userName" placeholder="Enter your username..."></div>
      <div class="inputFlex"><label for="email">EMAIL </label><input type="email" name="email" placeholder="Enter your email..."></div>
      <div class="inputFlex"><label for="dateOfBirth">DATE OF BIRTH </label><input type="date" name="date"></div>
      <div class="inputFlex"><label for="password">PASSWORD </label><input type="password" name="password" placeholder="Enter your password..."></div>
      <div class="inputFlex"><label for="confirmPassword">CONFIRM PASSWORD </label><input type="password" name="confirmPassword" placeholder="Confirm your password..."></div>
  </div>
      <input type="submit" name="submit" id="submit" value="REGISTER">
</form>`;

  const oldContent = bluePage.children[0];
  oldContent.remove();

  registerP.innerHTML = html;
  bluePage.appendChild(registerP);

  const form = registerP.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = registerP.querySelector("input[name = 'userName']").value;
    const password = registerP.querySelector("input[name = 'password']").value;
    const email = registerP.querySelector("input[name = 'email']").value;
    const birth = registerP.querySelector("input[name = 'date']").value;

    try {
      await register(username, email, password, birth);
      menuPage();
    } catch (error) {
      alert(error.message);
    }
  });
}

async function login(username, password) {
  const res = await fetch("/logIn", {
    method: "POST",
    body: JSON.stringify({
      name: username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.message);
  }

  const token = data.token;
  const userData = data.user;

  localStorage.token = token;
  user.update(userData);
  return data;
}

async function register(username, email, password, birth) {
  const res = await fetch("/signUp", {
    method: "POST",
    body: JSON.stringify({
      name: username,
      email,
      password,
      dateOfBirth: birth,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.message);
  }

  const token = data.token;
  const userData = data.user;

  localStorage.token = token;
  user.update(userData);
  return data;
}
