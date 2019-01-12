var socket = io();

function scrollToBottom() {
    var message = $('#messages');
    var newMessage = message.children('li:last-child');
    // height
    var clientHeight = message.prop('clientHeight');
    var scrollTop = message.prop('scrollTop');
    var scrollHeight = message.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        message.scrollTop(scrollHeight, true)
    }
}

socket.on('connect', function () {
    let param = $.deparam(window.location.search);
    console.log(socket);

    socket.emit('join', {
        name: param.name,
        room: param.room
    }, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('no error')
        }
    })
})

socket.on('disconnected', function () {
    console.log('disconnected from server');
})

socket.on('updateUserList', function (users) {
    var ol = $('<ol></ol>');
    var userList = document.createDocumentFragment();
    users.forEach((user) => {
        var li = document.createElement('li');
        userList.appendChild(li);
        li.appendChild(document.createTextNode(user));
    });
    ol.html(userList);
    $('#users').html(ol);
})

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createAt).format('h:mm a')
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createAt: formattedTime
    })
    $('#messages').append(html)
    scrollToBottom();
})

socket.on('newLocaltionMessage', (message) => {
    var formattedTime = moment(message.createAt).format('h:mm a');
    var template = $('#locationMessage-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createAt: formattedTime
    })
    $('#messages').append(html);
})

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