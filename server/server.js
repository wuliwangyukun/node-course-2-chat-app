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
var {
    generateMessage
} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('admin', 'welcome to the chat app'))

    socket.broadcast.emit('newMessage', generateMessage('admin', 'welcome admin join the chat room'))

    socket.on('createMessage', function (message) {
        // socket.broadcast给其他人发送事件(不包括自己)
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // });

        // io.emit会给所有连接的客户端发送事件(包括自己)
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // })
    })

    socket.on('disconnect', () => {
        console.log('user was disconnected');
    })
})

server.listen(port, () => {
    console.log(`server start for ${port}`);
})