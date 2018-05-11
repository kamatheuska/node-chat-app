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

  socket.emit('newMessage', {
    from: 'john@example.com',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti non soluta cupiditate assumenda magni amet, quos nihil perspiciatis quisquam, facere eaque nulla doloremque, recusandae nam provident voluptates laudantium, cumque. Culpa.',
    createdAt: Date.now()
  })

  socket.on('createMessage', (msg) => {
    console.log('Message from client: ', msg)
  })
  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail)
  })
  
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

app.use(express.static(publicPath))
server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})