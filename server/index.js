const server = require('express')()
const http = require('http').createServer(server)
const io = require('socket.io')(http)

const PORT = process.env.PORT || 3001


server.get('/', (req, res) => {
  res.send('React Chat API')
})


io.on('connection', (socket) => {
  const users = []
  let onlineCounter = 0

  socket.on('user:connected', (username) => {
    onlineCounter += 1
    io.emit('user:connected', username, onlineCounter)
    users.push(socket.id)
    console.log(users)
  })

  socket.on('chat:message', (message, username, date) => {
    io.emit('chat:message', message, username, date)
  })

  socket.on('disconnecting', () => {
    const userIndex = users.findIndex((id) => socket.id === id)

    if (userIndex !== -1) {
      users.splice(userIndex, 1)
    }
  })
})

http.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})