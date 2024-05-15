import { bluePage } from "../../main.js";

export function backBtn(oldContent , currentContent) {
  const backBt = document.createElement("div");
  backBt.className = "backBt opt";
  const html = `
    <img src="assists/images/back-bt.png" alt="back button" width="50px" id="backBt">
    `;
  backBt.innerHTML = html;
  backBt.addEventListener("click", () => {
    currentContent.remove();
    bluePage.appendChild(oldContent);
  });
  return backBt;
}
