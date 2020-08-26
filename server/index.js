const server = require('express')()
const http = require('http').createServer(server)
const io = require('socket.io')(http)

const PORT = process.env.PORT || 3001


server.get('/', (req, res) => {
  res.send('React Chat API')
})

const users = []

io.on('connection', (socket) => {

  socket.on('user:connected', ({ username }) => {
    users.push({ username, socketId: socket.id })
    io.emit('user:connected', { username, online: users.length })
  })

  socket.on('chat:message', ({ message, username, date }) => {
    io.emit('chat:message', { message, username, date })
  })

  socket.on('disconnecting', () => {
    const userIndex = users.findIndex((user) => socket.id === user.socketId)

    if (userIndex !== -1) {
      io.emit('user:disConnected', { username: users[userIndex].username, online: users.length - 1 })
      users.splice(userIndex, 1)
    }
  })
})

http.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})