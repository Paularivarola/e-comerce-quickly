const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

})

const Order = mongoose.model('order', orderSchema)

module.exports = Order