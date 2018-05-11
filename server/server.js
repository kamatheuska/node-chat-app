const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const app = express()
const port =  process.env.PORT || 3000

const server = http.createServer(app)
const io = socketIO(server)

const publicPath = path.join(__dirname, '../public')

io.on('connection', (socket) => {
  console.log('New user connected')

  // socket.emit from admin text welcome to the cat app
  //  socket.broadcast.emit from Admin text New user joined
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  })

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', (msg) => {
    console.log('Message from client: ', msg)

    io.emit('newMessage', {
      from: msg.from,
      text: msg.text,
      createdAt: new Date().getTime()
    })
    // socket.broadcast.emit('newMessage', {
    //   from: msg.from,
    //   text: msg.text,
    //   createdAt: new Date().getTime()
    // })
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

app.use(express.static(publicPath))
server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
