/* eslint-disable no-console */

const fs = require('fs');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

const TRACKS_DIR = `${__dirname}/tracks`;

const sendData = () =>
    fs.readdir(TRACKS_DIR, (err, files) => {
        const file = `${TRACKS_DIR}/${files[Math.floor(Math.random() * files.length)]}`;

        console.log(`Sending ${file}`);

        fs.readFile(file, (err, data) => {
            if (err) {
                throw err;
            }
            try {
                const sJ = JSON.parse(data);
                io.emit('track', { sJ });
            } catch (err) {
                console.log(err);
            }
        });
    });

setInterval(() => {
    sendData();
}, 5000);

io.on('connection', socket => {
    console.log('user connected');
    sendData();
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

httpServer.listen(3000);
