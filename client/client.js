import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

const getUsername = async () => {
  const username = localStorage.getItem("username");
  if (username) {
    console.log(`User existed ${username}`);
    return username;
  }

  const res = await fetch("https://random-data-api.com/api/users/random_user");
  const { username: randomUsername } = await res.json();
  localStorage.setItem("username", randomUsername);
  return randomUsername;
};

const socket = io({
  auth: {
    username: await getUsername(),
    serverOffset: 0,
  },
});

socket.on("chat message", (msg, serverOffset, username) => {
  const formattedMessage = formatMessage(msg);
  const item = `<li>
    <p>${formattedMessage}</p>
    <small>${username}</small>
  </li>`;
  messages.insertAdjacentHTML("beforeend", item);
  socket.auth.serverOffset = serverOffset;
  messages.scrollTop = messages.scrollHeight;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

function formatMessage(message) {
  if (message.type === "link") {
    return `<a href="${message.url}" target="_blank">${message.text}</a>`;
  } else {
    return message.text;
  }
}
