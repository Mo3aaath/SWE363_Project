import { User } from "../User.js";
import { bluePage } from "../main.js";
import { backBtn } from "./components/back_btn.js";

export function profilePage() {
  const profileP = document.createElement("div");
  profileP.className = "profilePage page";
  const html = `
  <div class="logo" id="logo">LOGO</div>
    <div class="divFlex">
        <div id="loginBtn" class="menuBox opt">LOGIN</div>
        <div id="registerBtn" class="menuBox opt">REGISTER</div>
    </div>
    `;

  const oldContent = bluePage.children[0];
  oldContent.remove();

  profileP.innerHTML = html;
  profileP.appendChild(backBtn(oldContent, profileP));
  bluePage.appendChild(profileP);
}

/**
 *
 * @param {User} user
 */
export function editProfilePage(user) {
  const editProfileP = document.createElement("div");
  editProfileP.className = "editProfilePage page";
  const html = `   <form action="" method="post">
  <div id="ProfileContainer">
      <input type="file" name="profilePic" id="profilePic" accept="image/*">
      <img src="/uploads/${
        user.imgUrl || "user.svg"
      }" alt="user icon" width="100px" id="userBt">
      <label for="profilePic" id="profilePicLabel"><img src="/assists/images/addImage.png" alt="user icon" width="20px" id="AddImageBt" ></label>
  </div>
  <div id="formFlex">
      <div class="inputFlex"><label for="userName">USERNAME </label><input type="text" name="userName" disabled placeholder="${
        user.name
      }" placeholder="Enter your username..."/></div>
      <div class="inputFlex"><label for="email">EMAIL </label><input type="email" name="email" disabled placeholder="${
        user.email
      }" placeholder="Enter your email..."></div>
      <div class="inputFlex"><label for="dateOfBirth">DATE OF BIRTH </label><input type="date" name="date" disabled value="${formatDate(
        user.birth
      )}"></div>
      <div class="inputFlex"><label class="Bio" for="Bio">Bio</label><textarea name="Bio" id="Bio" disabled placeholder="${
        user.bio
      }"></textarea></div>
  </div>
      <button type="submit" name="submit" id="submit">EDIT</button>
</form>`;
  const oldContent = bluePage.children[0];
  oldContent.remove();

  editProfileP.innerHTML = html;
  editProfileP.appendChild(backBtn(oldContent, editProfileP));
  bluePage.appendChild(editProfileP);

  const usernameInput = editProfileP.querySelector("input[name = 'userName']");
  const emailInput = editProfileP.querySelector("input[name = 'email']");
  const birthInput = editProfileP.querySelector("input[name = 'date']");
  const bioInput = editProfileP.querySelector("textarea[name = 'Bio']");
  const editButton = editProfileP.querySelector("button[name ='submit']");
  const backButton = editProfileP.querySelector("#backBt");
  const addphotoButton = editProfileP.querySelector("#AddImageBt");

  usernameInput.placeholder = user.name;
  emailInput.placeholder = user.email;
  birthInput.placeholder = user.birth;
  bioInput.placeholder = user.bio;

  editButton.addEventListener("click", async (e) => {
    e.preventDefault();
    editProfileP.appendChild(backBtn(oldContent, editProfileP));
    if (editButton.textContent === "EDIT") {
      usernameInput.disabled = false;
      emailInput.disabled = false;
      birthInput.disabled = false;
      bioInput.disabled = false;
      bioInput.disabled = false;

      usernameInput.value = user.name;
      emailInput.value = user.email;
      birthInput.value = formatDate(user.birth);
      bioInput.value = user.bio;

      editButton.textContent = "SAVE";
      backButton.style.opacity = 0;
      setTimeout(() => {
        backButton.classList.add("hidden");
        addphotoButton.classList.add("active");
      });
      editProfileP
        .querySelector("#profilePic")
        .addEventListener("change", (e) => {
          const file = e.target.files[0];
          if (file) {
            // Create a URL for the file
            const imageUrl = URL.createObjectURL(file);
            // Set the src of the img element to this URL
            document.getElementById("userBt").src = imageUrl;
          }
        });
    } else {
      // editButton.textContent = "EDIT";
      // backButton.style.opacity = 0;
      // setTimeout(() => {
      //   backButton.classList.add("hidden");
      //   addphotoButton.classList.remove("active");
      // });

      const newData = {};

      if (usernameInput.value !== user.name) newData.name = usernameInput.value;
      if (emailInput.value !== user.email) newData.email = emailInput.value;
      if (birthInput.value !== formatDate(user.birth))
        newData.birth = birthInput.value;
      if (bioInput.value !== user.bio) newData.bio = bioInput.value;

     try{
      await updateProfile(newData);
      user.update({
        name: usernameInput.value,
        email: emailInput.value,
        birth: birthInput.value,
        bio: bioInput.value,
      });
     }
      catch(error){
        alert(error.message);
      }
    }
  });
}
function formatDate(date) {
  console.log(date);
  return date.toISOString().slice(0, 10);
}

async function updateProfile(newData) {
  if (Object.keys(newData).length === 0) return;
  const myHeaders = new Headers();
  myHeaders.append("token", localStorage.getItem("token"));
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(newData);

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch("/update", requestOptions);
  const data = await response.text();
  
  if (!response.ok) {
    throw new Error(data.message);
  }
}
