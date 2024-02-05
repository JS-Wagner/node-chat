import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { createClient } from "@libsql/client";
import { recoverMessages, handleChatMessage, saveMessageOnDB } from "./messageHandler.js";

dotenv.config();

const port = process.env.PORT ?? 3000;
const app = express();
const server = createServer(app);

const io = new Server(server, {
  connectionStateRecovery: {},
});

const db = createClient({
  url: "libsql://stirred-whistler-js-wagner.turso.io",
  authToken: process.env.DB_TOKEN,
});

await db.execute(`
    CREATE TABLE IF NOT EXISTS messages (
        id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
        content TEXT,
        username VARCHAR(56)
    )`);

io.on("connection", async (socket) => {
    console.log("Un usuario se ha conectado");

    socket.on("disconnect", () => {
      console.log("Un usuario se desconectó");
    });

    socket.on("chat message", async (msg) => {
      handleChatMessage(io, socket, db, msg);
    });

    if (!socket.recovered) {
      recoverMessages(socket, db);
    }
  });

app.use(logger("dev"));

app.use(express.static('./client'));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
