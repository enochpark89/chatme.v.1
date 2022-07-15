const socket = io();

// Get BeforeEnter form
const beforeEnterDiv = document.querySelector(".beforeEnter");
const beforeEnterform = beforeEnterDiv.querySelector("form");
const chatboxDiv = document.querySelector(".chatbox");
const chatboxForm = chatboxDiv.querySelector("form");

// chatboxDiv.hidden=true;

// Two data to receive
let roomName;
let nickName;

// Handlers functions
function handlebeforeEnterSumbit(event) {
  event.preventDefault();
  const p1 = beforeEnterform.querySelector("#roomname");
  const roomname = p1.querySelector("input");
  const p2 = beforeEnterform.querySelector("#nickname");
  const nickname = p2.querySelector("input");

  // retrieve the variables.
  roomName = roomname.value;
  nickName = nickname.value;
  
  // Send these values to the server.
  
  // Send BE room data to create a room
  socket.emit("enter_room", roomName);
  

  // Send BE user nickname.
  socket.emit("nickname", nickName);

  // clear the input box.
  roomname.value = "";
  nickname.value = "";
  console.log(socket);
  
  // hide the current 
  beforeEnterDiv.hidden = true;
  // chatboxDiv.hidden = false;
}

function handleChatboxSubmit(event) {
  event.preventDefault();
  const span = chatboxForm.querySelector("span");
  const input = span.querySelector("input");
  const chatSpace = chatboxForm.querySelector(".chatspace")
  const chatBubble = document.createElement("h4");
  const chatText = document.createTextNode(input.value);
  chatBubble.appendChild(chatText);
  chatSpace.appendChild(chatBubble);
  input.value = ""
}

// Submission Eventlisteners.
beforeEnterform.addEventListener("submit", handlebeforeEnterSumbit);
chatboxForm.addEventListener("submit", handleChatboxSubmit)
/*
Series of problem-solving steps to create a chatapps.
1. When the user submit, it takes the data and handles. 
- Create a getter.
2. Once they enter the data, hide the beforeEnterform and unhide the chatbox.
- Used the <div>.hidden attribute
3. When the user send 
*/