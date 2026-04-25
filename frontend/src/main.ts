import "./style.css";
import typescriptLogo from "./assets/typescript.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";

const formEndpoint = "https://backend.gstav.se/contact-form";
let responseMessage = "";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${typescriptLogo}" class="framework" alt="TypeScript logo"/>
    <img src="${viteLogo}" class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1>Gustav Andersson</h1>
    <p>Welcome to my humble abode</p>
  </div>
</section>

<section class="section-area">
  <div id="docs">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#documentation-icon"></use></svg>
    <h2>About me</h2>
    <p>I'm a web developer from Sweden, currently residing in Dalarna.</p>
    <p>
      Involved with maintaining the open-source project
      <a href="https://w3champions.com" target="_blank">W3Champions</a>,
      which is a third party platform for competitive Warcraft III gaming.</p>
  </div>
  <div id="social">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#social-icon"></use></svg>
    <h2>Connect with me</h2>
    <p>Check out my GitHub, find me on Discord, or send me an e-mail.</p>
    <ul>
      <li>
        <a href="https://github.com/gustav87" target="_blank">
          <img src="https://cdn.simpleicons.org/github/black/white" height="20">
          GitHub
        </a>
      </li>
      <li>
        <a href="https://discord.gg/7Bw2rwQ8xh" target="_blank">
        <img src="https://cdn.simpleicons.org/discord/7289da" height="20">
        Discord
        </a>
      </li>
      <li>
        <a href="#contact-form">
          <img height="20" src="https://cdn.simpleicons.org/mailgun/eb5454" />
          Mail
        </a>
      </li>
    </ul>
  </div>
</section>
<section class="section-area">
  <div id="contact-form" style="display: flex; flex-direction: column; align-items: center;">
    <h2>Contact me</h2>
    <div style="width: 50%;">
      <label for="name">Name</label>
      <input
        class="contact-input"
        style="margin-bottom: 10px;"
        type="text"
        id="name"
      />

      <label for="email">Email</label>
      <input
        class="contact-input"
        style="margin-bottom: 10px;"
        type="email"
        id="email"
      />

      <label for="message">Message</label>
      <textarea
        class="contact-input"
        style="margin-bottom: 15px; resize: none;"
        rows="10"
        id="message"
      ></textarea>

      <div style="display: flex; gap: 10px;">
        <input type="submit" id="send" value="Send Message" />
      </div>
    </div>
    <div>${responseMessage}</div>
  </div>
</section>
<section id="spacer"></section>
`;

async function sendData(event: Event) {
  event.preventDefault();
  const nameElement = document.querySelector("#name") as HTMLInputElement;
  const emailElement = document.querySelector("#email") as HTMLInputElement;
  const messageElement = document.querySelector("#message") as HTMLInputElement;

  const formData = new FormData();
  formData.append("name", nameElement.value);
  formData.append("email", emailElement.value);
  formData.append("message", messageElement.value);

  try {
    const response = await fetch(formEndpoint, {
      method: "POST",
      body: formData,
    });
    const res = await response.json();
    console.log(res);
    responseMessage = res.message;
  } catch (e) {
    console.error(e);
  }
}

const send = document.querySelector("#send");
send!.addEventListener("click", sendData);
