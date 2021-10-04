const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

})

const Product = mongoose.model('product', productSchema)

module.exports = Product