import http from "http";
import SocketIO from "socket.io";
import express from "express";


const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

// create HTTP server.
const httpServer = http.createServer(app);
// we send HTTP server to SocketIO server.
const wsServer = SocketIO(httpServer);

// Create a connection handler. 
wsServer.on("connection", (socket) => {
    // handle event called "enter_room"
    socket.onAny((event) => {
      console.log(`Socket Event: ${event}`);
    });
    // FE sends roomName when the user sumbit.
    socket.on("enter_room", (roomName, nickname, done) => {
      // join a room name
      socket.join(roomName);
      socket["nickname"] = nickname;
      console.log(socket);
      done();
      // send welcome message to all users in the room EXCEPT for yourself.
      socket.to(roomName).emit("welcome", socket.nickname);
    });
    socket.on("disconnecting", () => {
      socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nickname)
    );
      });
    socket.on("new_message", (msg, room, done) => {
      socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
      done();
    });
});

// WebSocket build chat app. 
// Create HTTP server and we build WSS on top.
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);