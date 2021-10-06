const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./config/database')
require('./config/passport')
const router = require('./routes/index')
const admin = require('./routes/admin')
const socket = require('socket.io')
const path = require('path')
const fileUpload = require('express-fileupload')

const app = express()

app.use(express.static('assets'))
app.use(cors())
app.use(express.json())
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
)

app.use('/api', router)
app.use('/api/admin', admin)

//Validate production state
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
  })
}

const PORT = process.env.PORT
const HOST = process.env.HOST || '0.0.0.0'

//Server listening
const server = app.listen(PORT, HOST, () => console.log(`Server listening on port ${PORT} (${HOST})`))
const io = socket(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
})

const socketioJwt = require('socketio-jwt')

io.use(
  socketioJwt.authorize({
    secret: process.env.SECRETORKEY,
    handshake: true,
  })
)

io.on('connection', (socket) => {
  const socketEmail = socket.decoded_token._doc.email

  socket.join(socketEmail)

  socket.on('createOrder', () => {
    io.to('admin@appname.com').emit('createOrder')
  })
  socket.on('updateOrders', (email) => {
    io.to(email).emit('updateOrders')
  })
})
