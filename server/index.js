const server = require('express')()
const http = require('http').createServer(server)
const io = require('socket.io')(http)

const PORT = process.env.PORT || 3001

server.get('/', (req, res) => {
  res.send('Chat API')
})

io.on('connection', (socket) => {
  socket.on('chat:message', message => {
    io.emit('chat:message', message)
  })
})

http.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})