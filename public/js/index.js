var socket = io();

socket.on('connected', function () {
    console.log('connect to server');

})

// socket.emit('createMessage', {
//     to: 'july@exeample.com',
//     text: 'hey',
// })

socket.on('newMessage', function (data) {
    console.log('data', data);
})

socket.on('disconnected', function () {
    console.log('disconnected from server');
})