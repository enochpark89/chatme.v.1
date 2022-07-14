const socket = io();

// Get div with ID "beforeEnter"
const beforeEnter = document.getElementById("beforeEnter");
// Get the beforeEnterForm inside beforeEnter div.
const beforeEnterForm = beforeEnter.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

// save the roomname
let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul")
  const li = document.createElement("li")
  li.innerText = message
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("input");
  const value = input.value;
  // room gets sent to BE and once returned, it will add message to the room.
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function showRoom() {
  beforeEnter.hidden = true;
  // show room interface
  room.hidden = false;
  // paint the room name.
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;

  // Create a event handler when the user enter text in a chatroom
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handleMessageSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const roomname = beforeEnterForm.querySelector("#roomname");
  const nickname = beforeEnterForm.querySelector("#nickname");
  
  socket.emit("enter_room", roomname.value, nickname.value, showRoom);
  roomName = roomname.value;
  roomname.value = "";
  nickname.value = "";
}

beforeEnterForm.addEventListener("submit", handleRoomSubmit);

// Paint a message when someone joins a room.
socket.on("welcome", (user) => {
  // specify the user who joined.
  addMessage(`${user} arrived!`);
});

// Paing a message to FE when someone leaves a room.
socket.on("bye", (left) => {
  addMessage(`${left} left the room.`);
});

// paint new message received and send it to the server.
socket.on("new_message", addMessage);
