const server = require('express')()
const http = require('http').createServer(server)
const io = require('socket.io')(http)

const PORT = process.env.PORT || 3001

server.get('/', (req, res) => {
  res.send('Chat API')
})

io.on('connection', (socket) => {
  socket.on('chat:message', (message, username, date) => {
    io.emit('chat:message', message, username, date)
  })
})

http.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})