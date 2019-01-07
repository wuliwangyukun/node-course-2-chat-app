const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
//拼接路径
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'michael',
        text: 'what going on',
        createAt: 123
    })

    socket.on('createMessage', function (data) {
        console.log(data);
    })

    socket.on('disconnect', () => {
        console.log('user was disconnected');
    })
})

server.listen(port, () => {
    console.log(`server start for ${port}`);
})