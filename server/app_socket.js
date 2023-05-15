const WebSocket = require('ws');
const database = require("./database/database");
const Shawarma = require("./models/shawarma");
const Notification = require("./models/notification");
const server = new WebSocket.Server({ port: 3001 });

let CLIENTS=[];

server.on('connection', (socket) => {
    console.log('Client connected');

    CLIENTS.push(socket);

    socket.on('message', (message) => {
        if (message.toString() !== 'open') {
            database.query(Notification.createNotification(message.toString()), function (error, result) {
                if (error) {
                    return console.log(error.message);
                }
                console.log('here');

                for (let i = 0; i < CLIENTS.length; i++) {
                    CLIENTS[i].send(message);
                }

                //socket.send("message");
            });
        }
        // Echo the message back to the client
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server started on port 3001');