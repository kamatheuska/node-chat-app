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

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

app.use(express.static(publicPath))
server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})