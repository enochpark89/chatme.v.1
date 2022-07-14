# Zoom

Zoom Clone using WebRTC and websockets.

# Dev

1. Create a directory
2. Install Nodemon
```
npm i nodemon -D
```
3. Install Babel
- Create a folder called 'babel.config.js' or .json

4. Create a file called 'nodemon.json'
5. Create src/server.js
Inside server.js
```
console.log("hello");
```

6. Install @babel/core, @babel/cli, and @babel/node -D (development mode) with npm
```
npm i @babel/core @babel/cli @babel/node -D
```

7. Set up the babel.config.json and nodemon.json files.

8. Install @babel/preset-env

Script > Nodemon > Run script

9. Install ExpressJS and pug

10. Summary
- Set up babel - Translator to the recent js
babel.config.json
```js
{
  "presets": ["@babel/preset-env"]
}
```
nodemon.json
```js
{
  "exec": "babel-node src/server.js"
}
```
server.js
```js
import express from "express";
const app = express();
console.log("hello");
app.listen(3000);
```
- This is the fastest and simplist way to set up Express.js server.

## Front End Setup

1. src/public/js/init.js
2. Input that public folder
```js
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListen);
```

3. Since nodemon refreshed the server everytime the app.js file is updated, you can ignore that by putting "ignore" key in the nodemon.json file.
- After you set it up, updating app.js will not refresh the server.

4. Use MVP.css to make the default HTML tag to look better. 

Summary:
1. Nodemon: restart the server everytime there is a change. Then, we use babel-node to compile it to the sexy JavaScript code. 
2. Public code is going to be executing from the Front-end. 
3. If you are not allowing user to go to other URL, you can do below

```js

```

## 3. Chat with websocket

- Exciting to create a real-time app. 
- Functions that we are going to build.
    1. Send messages.
    2. Create a room
    3. Events.

- Websocket gives us ability to do a real-time chat.
*What is the websocket?*

*What are the difference between HTTP and Websocket?*
- HTTP: Stateless - backend doesn't remember the user. 
- If you do an authentication, you know that server forgets who you are. If you are already logged in, you would need to send the cookies to validate who you are. 
    - forgets who you are
    - server needs to wait for requests to respond.
- WebSocket: a protocol.
    - a protocol
    - instead of https, you use wss.
    - When the websocket connection happends, it is like a handshake. Once the server accept this session, the connection is established. 
    - Server can any point send messeges to the server. 
    - You have a bi-directional connection between. 
    - Once we are connected, it is like you are in the phone. 
    - Ex: Backend in Go support Websocket. This should be done between Backend-to-backend.
    - 

*How do you set up websocket server in NodeJS?*
- You use ws package to set up webSocket server.
- Protocol: how things should communicate. 
    - Rules of how servers should communicate.
    - There are websocket implementation for C#, Golang, Java and others. 

- Chatroom is not included in WS. Chatroom is not part of the protocol. 
- Chatroom is just a nice feature. 
- There are a framework that uses WS and this framework already has a feature such as chat. 
- We are going to learn how to use websocket and move on to the ws framework. 

Install ws
```
npm i ws
```

Steps:
1. Make the express handle ws instead of http. 
2. Express + WS to handle websocket functionality.

```js
// HTTP server created.
const server = http.createServer(app);

// wss server created.
const wss = new WebSocket.Server({server});
/* This is not required. 
Sometimes, you only want to run WSS server.
You don't have to run both servers.
*/

// handle both wss and http protocols.
server.listen(3000, handleListen)

```

- we already have a websocket constructor that connects to the backend. 
- Websocket looks a lot like a front-end. 
- Just like btn.addEventListener() looks like a websocket. 

Steps:
1. Create a websocket connection handler. 
```js
function handleConnection(socket) {
    console.log(socket);
}
wss.on("connection", handleConnection);
```
2. Connect backend to the front-end.
Please refer to the documentation:
developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket

- It doesn't work because it is a different protocol. 


*What is webSocket event?*
- Server.js - browser that just connected. 
in App.js - socket represents the connection to the server.

*Create a first connection to the back-end using the front-end.*

- We have a webSocket() constructor that connects to the backend. 

## WebSocket Messages

- Modification:
Step
1. Create annonymous function but you are inside the connection.
```js
wss.on("connection", (socket) => {
  console.log("Connected to Browser ✅");
});
```
2. Send data
```js

```
- The code didn't run so I am backing up my code here.

server.js
```js
import express from "express";
import WebSocket from "ws";
import http from "http";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
// This create a public URL route
app.use("/public", express.static(__dirname+"/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));
const handleListen = () => console.log("Listening on http://localhost:3000");

// HTTP server created.
const server = http.createServer(app);

// wss server created.
const wss = new WebSocket.Server({server});
/* This is not required. 
Sometimes, you only want to run WSS server.
You don't have to run both servers.
*/

// Socket = browser that you connected.
// function handleConnection(socket) {
//     console.log(socket);
// }

// A Connection
wss.on("connection", (socket) => {
    console.log("Connected to Browser ✅");
    socket.on("close", () => console.log("Disconnected from the Browser ❌"));
    socket.on("message", (message) => {
      console.log(message);
    });
    socket.send("hello!!!");
  });

// handle both wss and http protocols.
server.listen(3000, handleListen)
```

app.js
```js
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

setTimeout(() => {
  socket.send("hello from the browser!");
}, 10000);
```

**I did not add the app.js from the frond-end by including it in the template**

*How do you create a chat?*

Steps:
- Take the message from the input
- Send message from app.js
- Receive message from server.js


- However, you are just talking to the back-end, not to the other user. 

*How do you let users talk to each other?*
steps:
1. Create a fake DB in server.js
2. Create different browser w/ message.
3. You can send data to the user. 
4. Basically, you are getting the same message that you typed back. 

## Nicknames

*How do you allow users to create a nickname?*

Steps:
1. Create another form that allows you to choose the nickname
2. Have two forms: one takes a nickname and the other takes the messages. 
3. We send JSON file that contains these two information to the server.
4. We are going to set a default nickname called "Anon" in case, they don't submit their nnickname. Otherwise, we are going to save message into the fake DB and send back both nickname and message. 

## Things that could be better for develoepers. 

- If browser sends a message, we are returning a same message. There should be a way to send message to everybody. 

Prospects:
Steps:
1. Create a function that allows to send message to everybody except for myself.
2. Knowing that makeMessage function stringify the JSON file, there should be multiple eventListener that listens to something like
a. someone left the chat
b. messages from other people. 


# 2.0 SocketIO

- SocketIO has been out for a long time. It is stable. 
*What is socketIO?*
- SocketIO enables real-tim, bi-directional and event-based communication. 

*What are the differences between SocketIO and Websockets?*
- SocketIO is a framework that gives real-time using websocket and other things. 
- SocketIO is more resilient than websocket.
- Even if browser or a phone device is not supported by websocket, SocketIO would still work using other methods. (ex: firewall, etc. but 97% of the website works.)
- *Please refer to the documentation*
- There are lots of gambling website using SocketIO. 
- Again, SocketIO is resilient, it will find a way to connect even if the websocket doesn't work .

*How do you install SocketIO?*

1. Delete WebSocket

server.js
```js
import http from "http";
import express from "express";
const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const 

// WebSocket build chat app. 
// Create HTTP server and we build WSS on top.
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// function onSocketClose() {
//     console.log("Disconnected from the Browser ❌");
//   }
//   const sockets = [];

// wss.on("connection", (socket) => {
//     sockets.push(socket);
//     socket["nickname"] = "Anon";
//     console.log("Connected to Browser ✅");
//     socket.on("close", onSocketClose);
//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg);
//         switch (message.type) {
//           case "new_message":
//             sockets.forEach((aSocket) =>
//               aSocket.send(`${socket.nickname}: ${message.payload}`)
//             );
//           case "nickname":
//             socket["nickname"] = message.payload;
//         }
//       });
//     });

server.listen(3000, handleListen);

```

2. Install SocketIO

```
npm i socket.io
```

3. Create a SocketIO server on top of HTTP server.
server.js
```js
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer)
```

*How do you know that your socketIO is active*
When you go to http://localhost:3000/socket.io/socket.io.js, you will see that there are socketIO going on in the backend.

- you have to do this becuase this is not just a websocket implementation. There are additional functions. 

- Conclusion: you have to import this path in the home template. 
```pug
        script(src="/socket.io/socket.io.js") 
```

- *If you console log socketIO socket, you will get a JSON file with config/server data.*

Recap:
1. emit can recieve 6 arguments with positional argument if you want to. 
- Arguments can be any type of variables. 
2. 

## Create a chatroom

- Rooms are important for webSocket.
- Tinder - dating app - chatroom. 
*How do you create a room?*
```js
socket.join(roomName);
```
- These come from SocketIO documentation.

- There is a socket ID. When you join, you can join with a certain unique number that will be the room number

```js

```

Steps:
1. We are going to let everyone know when you join the room.
  - Hide the form from the template once they joined. 

2. 

## Room Messages

- If you know the ID of another socket, you can send a private message.
``` 
socket.to().emit("hey);
```
- 

## Room notificatoins

- We need to let everyone know that you left the room.

- If you look at the documentaiton, you can use an event disconnecting. (different from disconnect.): going to be disconnected but haven't left the room. At this state, we can send a message to our room.

- Send message:
steps:
In app.js
1. Query select a form when you showRoom()
2. Then, add eventListener when the user sumbit a mesage.
3. Retrieve the input from the MessageSubmit Handler

app.js
```js
// (partial)
function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const form = room.querySelector("form");
  form.addEventListener("submit", handleMessageSubmit);
}
```

4. BE needs to receive a new message and send it to the proper room. 

## Add Nickname

https://github.com/nomadcoders/noom/commit/17541fe85f4766aa9b8692fda429565130a702ce

## Challenge: Modify on the chat room

1. Create FE where you ask the nickname and the room name
  - Create forms that takes in two inputs
  - Confirmation as they enter: FOR LATER.
2. on FE, querySelect the inputs for nickname and the roomname.
3. 

3. When the other users join, they should see the new user coming in
4. If other user left, you should see them leaving. 
5. 


## Room count

*What is adapter?*
- We are using the adapter in the memory of the server. 
- Everytime we restart the server, all the rooms are gone.
- When you have many clients, you have to open connection to all clients. 
- Please refer to the documentation below:
socket.io/docs/v4/mongo-adapter/

- Adapter is the window into your application. It shows how many users and how many users are in. 
*You can view this information by wsServer.sockets.adapter.*
Important values:
1. Rooms
2. SocketIDs

- What is Map?
- Map is like an object but it has unique keys. 
- When you set a variable inside the Map object, it can store key-value pair.
food.get("lalalala")

- What you can do is to get socketID and the rooms. SocketId are sometimes same as room. 
- If you want to get ID of the rooms that are public, (all socket has a private room with SocketID). 
- You can loop through all rooms and take value and key. 
- If you console log, you see that values are true for everything but the keys are different. 

```js
rooms.forEach((_,key)=> {
  if(sids.get(key)=== undefined){
    you found the key! console.log(key)
  }
})
```
Hints:
ㅋㅋㅋㅋㅋ 요약: sids에는 개인방, rooms에는 개인방,공개방 다있음.
rooms가 sids를 포함한다 보면됨.
그래서 공개방만 얻고 싶을때는 rooms에서 sids를 빼면 됨