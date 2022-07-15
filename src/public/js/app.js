const socket = io();

// Get BeforeEnter form
const beforeEnterDiv = document.querySelector(".beforeEnter");
const beforeEnterform = beforeEnterDiv.querySelector("form");
const chatboxDiv = document.querySelector(".chatbox");
const chatboxForm = chatboxDiv.querySelector("form");

chatboxDiv.hidden=true;

// Two data to receive
let roomName;
let nickName;

// Handlers functions

function showMessage(message) {
  const chatSpace = chatboxForm.querySelector(".chatspace")
  const chatBubble = document.createElement("h4");
  const chatText = document.createTextNode(message);
  chatBubble.appendChild(chatText);
  chatSpace.appendChild(chatBubble);
  
}

function showRoom() {
  // hide the current 
  beforeEnterDiv.hidden = true;
  chatboxDiv.hidden = false;
  const chatroomName = chatboxForm.querySelector("h2");
  chatroomName.textContent  = `Chatroom: ${roomName}`;
  const chatSpace = chatboxForm.querySelector(".chatspace")
  const chatBubble = document.createElement("h4");
  const chatText = document.createTextNode(`Welcome ${nickName}!`);
  chatBubble.appendChild(chatText);
  chatSpace.appendChild(chatBubble);

}

function handlebeforeEnterSumbit(event) {
  event.preventDefault();
  const p1 = beforeEnterform.querySelector("#roomname");
  const roomname = p1.querySelector("input");
  const p2 = beforeEnterform.querySelector("#nickname");
  const nickname = p2.querySelector("input");

  // retrieve the variables.
  roomName = roomname.value;
  nickName = nickname.value;
  
  // clear the input box.
  roomname.value = "";
  nickname.value = "";

  // Send these values to the server.
  
  // Send BE room data to create a room
  socket.emit("enter_room", roomName, nickName, showRoom);
 

}

function handleChatboxSubmit(event) {
  event.preventDefault();
  const span = chatboxForm.querySelector("span");
  const input = span.querySelector("input");
  
  // Send the message to the server for broadcast.
  socket.emit("new_message", input.value, roomName, nickName, showMessage);
  input.value = ""
}

// Submission Eventlisteners.
beforeEnterform.addEventListener("submit", handlebeforeEnterSumbit);
chatboxForm.addEventListener("submit", handleChatboxSubmit)

socket.on("new_message", showMessage);
