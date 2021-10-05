const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  productId: { type: mongoose.Types.ObjectId, ref: 'product' },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
})

const orderSchema = new mongoose.Schema({
  date: { type: String, required: true },
  customerId: { type: mongoose.Types.ObjectId, ref: 'user' },
  products: [productSchema],
  paymentMethod: String,
  delivery: Boolean,
  status: { type: String, default: 'Pendiente' },
})

module.exports = mongoose.model('order', orderSchema)
