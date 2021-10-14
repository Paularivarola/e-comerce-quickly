const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
})

module.exports = mongoose.model('ticket', ticketSchema)
