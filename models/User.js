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

const paymentCardsSchema = new mongoose.Schema({
  cardNumber: { type: Number, required: true },
  cardExpDate: { type: String, required: true },
  cardName: { type: String, required: true },
  CVC: { type: Number, required: true },
  DNI: { type: String, required: true },
})

const productSchema = new mongoose.Schema({
  productId: { type: mongoose.Types.ObjectId, ref: 'product' },
  quantity: Number,
})

const userSchema = new mongoose.Schema({
  data: { type: userDataSchema, ref: 'data' },
  ordersId: [{ type: mongoose.Types.ObjectId, ref: 'order' }],
  addresses: [{ type: addressSchema, ref: 'address' }],
  cart: [productSchema],
  favouriteProductsId: [{ type: mongoose.Types.ObjectId, ref: 'product' }],
  paymentCards: [{ type: paymentCardsSchema, ref: 'payment_cards' }],
})

module.exports = mongoose.model('user', userSchema)
