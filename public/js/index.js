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

socket.on('newLocaltionMessage', (message) => {
    var li = $('<li></li>')
    var a = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}:`);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
})

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'hi',
// }, function (data) {
//     console.log('Got it', data);
// })

$('#message-from').on('submit', function (e) {
    e.preventDefault();
    console.log($('[name=message]'))
    let text = $('[name=message]').val();
    if (text) {
        socket.emit('createMessage', {
            from: 'User',
            text
        }, function () {

        })
        $('[name=message]').val('')
    }
})

var locationButton = $('#send-location');
locationButton.on('click', function (e) {
    if (!navigator.geolocation) {
        return alert('Geolocation not supperted on your brower')
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log('position', position);
        socket.emit('createdLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function (error) {
        alert('Unable to fetch location')
    })
})