const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  ingredients: { type: Array, required: true },
  multipleDrinks: Boolean,
  extras: Boolean,
  papas: Boolean,
  score: { type: Number, defalut: 4.6 },
  stock: { type: Number, required: true },
  favs: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
})

const Product = mongoose.model('product', productSchema)

module.exports = Product
