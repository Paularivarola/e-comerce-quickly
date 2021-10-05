const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    date: { type: String, required: true },
    customer: { type: mongoose.Types.ObjectId, ref: "user" },
    products: [{
        product: { type: mongoose.Types.ObjectId, ref: "product" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    }]
})

const Order = mongoose.model('order', orderSchema)

module.exports = Order