const server = require('express')
const app = server()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const consumer = require('./consumer')
const PORT = process.env.PORT || 3000
const path = require('path')

global.users = []

consumer.start(io)

app.use(server.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'client/build', 'index.html')))
app.get('/users', (req, res) => res.json({ users }))

http.listen(PORT, () => console.log(`Server running on port: ${PORT}`))