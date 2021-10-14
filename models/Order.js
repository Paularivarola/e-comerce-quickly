const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  date: { type: String, required: true },
  customerId: String,
  userId: { type: mongoose.Types.ObjectId, ref: 'user' },
  purchased: Array,
  paymentMethod: Object,
  metadata: Object,
  deliveryAddress: Object,
  deliveryTime: String,
  status: { type: String, default: 'Pendiente' },
})

module.exports = mongoose.model('order', orderSchema)
