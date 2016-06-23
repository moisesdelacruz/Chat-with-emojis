'use strict'
const socketio = require('socket.io')
const database = require('../database')

module.exports = function (server) {
  const db = database()
  const io = socketio(server)
  io.on('connection', onConnection)

  function onConnection (socket) {
    console.log(`Client connected ${socket.id}`)

    db.list((err, messages) => {
      if (err) return console.error(err)

      socket.emit('messages', messages)
    })

    socket.on('message', (message) => {
      // Save message
      db.save(message, (err) => {
        if (err) return console.error(err)
      })

      // Send video to everyone
      socket.broadcast.emit('message', message)
    })
  }
}