module.exports = {
  start: (io) => {
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
  }
}