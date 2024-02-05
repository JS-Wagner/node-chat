//Recupera los mensajes de la base de datos
export async function recoverFromDB(socket, db) { 
    const result = await db.execute({
      sql: "SELECT id, content, username FROM messages WHERE id > ?",
      args: [socket.handshake.auth.serverOffset ?? 0],
    });
    return result;
  }
  
  //Guarda los mensajes en la base de datos
  export async function saveOnDB(db, uuid, msg, username) { 
    return await db.execute({
      sql: "INSERT INTO messages (id, content, username) VALUES (:uuid, :msg, :username);",
      args: { uuid, msg, username },
    });
  }
  