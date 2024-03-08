// Importar las dependencias necesarias
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Importar el módulo 'path'

// Inicializar la aplicación Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configurar la conexión de Socket.IO
io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    // Manejar el evento de nuevo mensaje
    socket.on('nuevo mensaje', (mensaje) => {
        console.log('Nuevo mensaje:', mensaje);
        // Emitir el mensaje a todos los usuarios conectados
        io.emit('mensaje recibido', mensaje);
    });

    // Manejar la desconexión del usuario
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

// Configurar Express para servir archivos estáticos
app.use(express.static(__dirname));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
