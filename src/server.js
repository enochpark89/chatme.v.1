import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

// store names and roomnames in an array;
let users = [];
let roomnames = [];

wsServer.on("connection", (socket) => {
  
  // On any event, it will notify the console.
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });

  // when the client emit; respond by joining.
  socket.on("enter_room", (roomName) => {
    socket.join(roomName);
  });

  // wait for the nickname data; store it.
  socket.on("nickname", (nickname) => {
    users.push(nickname);
    console.log(users);
    console.log(socket);
  });
  
  
});


const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);