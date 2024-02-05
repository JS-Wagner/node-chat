import { v4 as uuidv4 } from "uuid";
import { recoverFromDB, saveOnDB } from "./recoveryUtils.js";
import { formatMessage, isLink } from "./formattingUtils.js";

//Escucha el mensaje y se encarga de realizar operaciones para preparar el guardado en la BBDD antes de emitirlo
export async function handleChatMessage(io, socket, db, msg) { 
  const formattedMessage = formatMessage(msg);
  let insertResult;
  const username = socket.handshake.auth.username ?? "Anonymous";
  try {
    const uuid = uuidv4();
    insertResult = await saveOnDB(db, uuid, msg, username);
  } catch (error) {
    console.error(error);
    return;
  }
  io.emit("chat message", formattedMessage, insertResult.lastInsertRowid.toString(), username);
}
//Renderiza los mensajes recuperados desde la BBDD
export async function recoverMessages(socket, db) { 
  try {
    const results = await recoverFromDB(socket, db); 
    results.rows.forEach((row) => {
      socket.emit("chat message", formatMessage(row.content), row.id.toString(), row.username);
    });
  } catch (e) {
    console.log(e);
  }
}

//Sirve de intermediario para guardar en BBDD
export async function saveMessageOnDB(db, uuid, msg, username) { 
  return await saveOnDB(db, uuid, msg, username);
}
