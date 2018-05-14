const socket = io()

function scrollToBottom () {
  let messages = $('#messages'),
      clientHeight = messages.prop('clientHeight'),
      newMessage = messages.children('li:last-child'),
      scrollTop = messages.prop('scrollTop'),
      scrollHeight = messages.prop('scrollHeight'),
      newMessageHeight = newMessage.innerHeight()
      lastMessageHeight = newMessage.prev().innerHeight()

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }
}

socket.on('connect', function () {
  console.log('Connected to server')
})

socket.on('disconnect', function () {
  console.log('Disconnected from server')
})

socket.on('newMessage', (msg) => {
  let formattedTime = moment(msg.createdAt).format('h:mm a')
  let template = $('#message-template').html()
  let html = Mustache.render(template, {
    text: msg.text,
    from: msg.from,
    createdAt: formattedTime
  })
  $('#messages').append(html)
  scrollToBottom()
})

socket.on('newLocationMessage', function (msg) {
  let formattedTime = moment(msg.createdAt).format('h:mm a')
  let template = $('#location-message-template').html()
  let html = Mustache.render(template, {
    from: msg.from,
    url: msg.url,
    createdAt: formattedTime
  })
  $('#messages').append(html)
  scrollToBottom()
})

$('#message-form').on('submit', function (e) {
  e.preventDefault()

  let messageTextBox = $('[name=message]')
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('')
  })
})

const locationButton = $('#send-location')

locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position)
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    locationButton.removeAttr('disabled').text('Send location')
  }, function () {
    locationButton.removeAttr('disabled').text('Send location')
    alert('Unable to fetch location')
  })
})