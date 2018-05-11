const socket = io()

socket.on('connect', function () {
  console.log('Connected to server')

  socket.on('newMessage', (msg) => {
    console.log('Message from server: ', msg)
  })
})

socket.on('disconnect', function () {
  console.log('Disconnected from server')
})

socket.on('newEmail', function (email) {
  console.log('New email', email)
})