const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const app = express()
const port =  process.env.PORT || 3000

const server = http.createServer(app)
const io = socketIO(server)

const { generateMessage, generateLocationMessage } = require('./utils/message')
const publicPath = path.join(__dirname, '../public')

io.on('connection', (socket) => {
  console.log('New user connected')
  socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

  socket.on('createMessage', (msg, callback) => {
    console.log('Message from client: ', msg)

    io.emit('newMessage', generateMessage(msg.from, msg.text))
    callback()
  })
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

app.use(express.static(publicPath))
server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
