const socket = io()

socket.on('connect', function () {
  console.log('Connected to server')

  socket.emit('createMessage', {
    from: 'peter@example.com',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut inventore ducimus velit a eos odit perspiciatis, nemo commodi officiis neque? Porro, quibusdam quae est unde ea nihil corporis possimus neque?'
  })

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