var socket = io();

socket.on('connected', function () {
    console.log('connect to server');

})

// socket.emit('createMessage', {
//     to: 'july@exeample.com',
//     text: 'hey',
// }, function (data) {
//     console.log('Got it', data);
// })

socket.on('newMessage', function (message) {
    console.log('message', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li)
})

socket.on('disconnected', function () {
    console.log('disconnected from server');
})

$('#message-from').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
            from: 'User',
            text: $('[name=message]').val()
        },
        function (data) {
            console.log('Got it', data);
        })
})