const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const app = express()
const port =  process.env.PORT || 3000

const server = http.createServer(app)
const io = socketIO(server)

const { generateMessage } = require('./utils/message')
const publicPath = path.join(__dirname, '../public')

io.on('connection', (socket) => {
  console.log('New user connected')

  // socket.emit from admin text welcome to the cat app
  //  socket.broadcast.emit from Admin text New user joined
  socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

  socket.on('createMessage', (msg, callback) => {
    console.log('Message from client: ', msg)

    io.emit('newMessage', generateMessage(msg.from, msg.text))
    callback('This is from the server.')
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
