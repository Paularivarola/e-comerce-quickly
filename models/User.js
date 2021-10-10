const mongoose = require('mongoose')

const userDataSchema = new mongoose.Schema({
  admin: { flag: { type: Boolean, default: false }, key: String },
  google: { type: Boolean, default: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  src: { type: String },
})

const addressSchema = new mongoose.Schema({
  alias: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: String, required: true },
  apartment: { type: String },
  neighborhood: { type: String, required: true },
})

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Types.ObjectId, ref: 'product' },
  quantity: Number,
  fries: Object,
  extras: Array,
  drinks: Array,
})

const userSchema = new mongoose.Schema({
  data: { type: userDataSchema, ref: 'data' },
  ordersId: [{ type: mongoose.Types.ObjectId, ref: 'order' }],
  addresses: [{ type: addressSchema, ref: 'address' }],
  cart: [cartItemSchema],
  paymentCards: Array,
})

module.exports = mongoose.model('user', userSchema)
