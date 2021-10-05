const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    admin: { type: Boolean, default: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    ordersId: [{ type: mongoose.Types.ObjectId, ref: "order" }],
    addresses: [{
        street: { type: String, required: true },
        //comuna? ciudad, etc
    }],
    cart: [{
        product: { type: mongoose.Types.ObjectId, ref: "product" },
        quantity: { type: Number, required: true }
    }],
    cards: [{
        name: String,
        cardNumber: Number,
        expDate: String,
        cvc: Number
    }],
    favorites: { type: mongoose.Types.ObjectId, ref: "product" },
    google: { type: Boolean, default: false }
})

const User = mongoose.model('user', userSchema)

module.exports = User