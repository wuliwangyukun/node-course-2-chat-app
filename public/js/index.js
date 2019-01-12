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
    let messageInput = $('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageInput.val()
    }, function () {
        messageInput.val('')
    })
})

var locationButton = $('#send-location');
locationButton.on('click', function (e) {
    if (!navigator.geolocation) {
        return alert('Geolocation not supperted on your brower')
    }
    locationButton.attr('disable', true).text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log('position', position);
        socket.emit('createdLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        locationButton.removeAttr('disable').text('Sending location');
    }, function (error) {
        locationButton.removeAttr('disable').text('Sending location');
        alert('Unable to fetch location')
    })
})