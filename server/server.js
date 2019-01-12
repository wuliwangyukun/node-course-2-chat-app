const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const moment = require('moment');

//拼接路径
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var {
    generateMessage,
    generateLocationMessage
} = require('./utils/message');
var {
    isReallyString,
} = require('./utils/validation');
var {
    Users,
} = require('./utils/users');

var users = new Users()

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', function (params, callback) {
        if (!isReallyString(params.name) || !isReallyString(params.room)) {
            return callback('Name and room name are required')
        }

        socket.join(params.room);
        //socket.leave('The office Fans');
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room))
        socket.emit('newMessage', generateMessage('Admin', `welcome to the ${params.room}`));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joind`))
        callback();
    })

    socket.on('createMessage', function (message, callback) {
        console.log(message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('this is from server')
    })

    socket.on('createdLocationMessage', function (coords) {
        console.log(coords);
        socket.emit('newLocaltionMessage', generateLocationMessage('A', coords.latitude, coords.longitude))
    })

    socket.on('disconnect', () => {
        console.log('user was disconnected');
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    })
})

server.listen(port, () => {
    console.log(`server start for ${port}`);
})