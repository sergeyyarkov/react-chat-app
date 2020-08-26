const server = require('express')()
const http = require('http').createServer(server)
const io = require('socket.io')(http)
const consumer = require('./consumer')
const PORT = process.env.PORT || 3001

global.users = []

consumer.start(io)

server.get('/', (req, res) => res.json({ users }))

http.listen(PORT, () => console.log(`Server running on port: ${PORT}`))