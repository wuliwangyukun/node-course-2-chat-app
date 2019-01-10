var socket = io();

socket.on('connected', function () {
    console.log('connect to server');
})

socket.on('disconnected', function () {
    console.log('disconnected from server');
})

socket.on('newMessage', function (message) {
    console.log('message', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li)
})

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'hi',
// }, function (data) {
//     console.log('Got it', data);
// })

$('#message-from').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function () {

    })
})