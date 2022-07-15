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

// Obj to store roomnames and usernames.
let rooms = {};

wsServer.on("connection", (socket) => {
  
  // On any event, it will notify the console.
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });

  // when the client emit; respond by joining.
  socket.on("enter_room", (roomName, nickName, done) => {
    socket.join(roomName);
    if (rooms[roomName]== undefined){
      rooms[roomName] = [];
      rooms[roomName].push(nickName);
    } else {
      rooms[roomName].push(nickName);
    }
    done();
    // socket.to(roomName).emit("welcome", socket.nickname);
    console.log(rooms);
  
  });
  // When the message is written, this gets broadcasted to all other users. 
  socket.on("new_message", (msg, roomname, nickname, done) => {
    // broadcast except the FE that sent this data.
    socket.to(roomname).emit("new_message", `${nickname}: ${msg}`);
    done(`You: ${msg}`);

  });
  
  
});


const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);