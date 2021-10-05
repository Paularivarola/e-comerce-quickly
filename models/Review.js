const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'user' },
  date: { type: String },
  review: { type: String },
  productId: { type: mongoose.Types.ObjectId, ref: 'product' },
  score: { type: Number, required: true },
  status: { type: Boolean, default: false },
})

const Review = mongoose.model('review', reviewSchema)

module.exports = Review
