import express from "express";
import http from "http";
import "./config/db";
import { Server } from "socket.io";
import { gameData } from "./socket";
import global from "./global";
import pub from "./config/redis/pub";
import sub from "./config/redis/sub";
import logger from "./logger";
const app = express();
app.set("view engine", "ejs");
app.use(express.static("./public"));
pub();
sub();
const server = http.createServer(app);
const io = new Server(server);
global.io = io;
app.get("/", (req, res) => {
  res.render("index");
});
io.on("connection", (socket) => {
  logger.info("a user connected" + socket.id);
  gameData(io, socket);
});
server.listen(3000, () => {
  logger.info("listening on port 3000")
});
