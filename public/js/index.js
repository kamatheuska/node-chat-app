const socket = io()

socket.on('connect', function () {
  console.log('Connected to server')
})

socket.on('disconnect', function () {
  console.log('Disconnected from server')
})

socket.on('newMessage', (msg) => {
  console.log('Message from server: ', msg)
  let li = $('<li></li>')
  li.text(`${msg.from}: ${msg.text}`)

  $('#messages').append(li)
})

socket.on('newLocationMessage', function (msg) {
  let li = $('<li></li>')
  let a =  $('<a target="_blank">My current location</a>')

  li.text(`${msg.from}: `)
  a.attr('href', msg.url)
  li.append(a)

  $('#messages').append(li)
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