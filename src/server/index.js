const http = require('http')
const secketio = require('socket.io')
const express = require('express')
const realtime = require('./realtime')

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = secketio(server)

realtime(server)
// Configurations of views html
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

// Configurations static files
app.use(express.static('public'))

app.get('/', (req, res) => {
	res.render('index')
})

server.listen(port, '0.0.0.0', () => console.log(`server listening on: http:0.0.0.0:${port}`))
