# node-chat

node-chat es un chat en tiempo real hecho a modo de práctica de varias tecnologías, utiliza Node.js, Express, Socket.io y SQL. Se basa en el protocolo de web-sockets para mantener una comunicación bidireccional entre el cliente y el servidor. Permite la interacción entre distintos usuarios, utiliza la base de datos para persistir los mensajes y su remitente, pudiéndose recuperar aún cuando se recarga la pestaña o se pierde la conexión, también incorpora soporte para URLs y emojis. 

## Instalación

Descargue este repositorio.

Descargue e instale 
[NodeJS](https://nodejs.org/download/release/v18.19.0/)

Descargue las siguientes dependencias desde la consola del proyecto:

```bash
npm install express
npm install morgan
npm install dotenv
npm install socket.io
npm install @libsql/client
npm install uuid

```

Verifique que el puerto 3000 se encuentra libre o cámbielo por otro de su gusto para que pueda utilizarlo el servicio.

Colocar el token de la base de datos SQL para poder persistir la información del chat.

```
.env
DB_TOKEN = "tu-base-de-datos-key"
```

## Uso
Ejecutar el siguiente comando en la consola para lanzar la aplicación
```bash
node ./server/index.js
```
![image](https://github.com/JS-Wagner/node-chat/assets/81495334/82074389-02c1-490f-8f19-839aeaf3f9c2)


## License
[MIT](https://choosealicense.com/licenses/mit/)
