const Product = require('../../models/Product')
const User = require('../../models/User')

const productControllers = {
  getProducts: async (req, res) => {
    try {
      let products = await Product.find()
      res.json({ success: true, response: products })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
  manageCart: async (req, res) => {
    const { product, action } = req.body
    let operation =
      action === 'add'
        ? { $push: { cart: product } }
        : action === 'delete'
        ? { $pull: { cart: product } }
        : action === 'setCart'
        ? { $set: { cart: product } }
        : { $set: { 'cart.$.quantity': product.quantity } }
    let searchOption =
      action === 'changeQuantity'
        ? { 'cart.productId': product.productId }
        : { _id }
    let options = { new: true }
    try {
      let user = await User.findOneAndUpdate(searchOption, operation, options)
      res.json({ success: true, userData: user })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
}

module.exports = productControllers
