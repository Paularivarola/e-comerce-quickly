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
  favHandler: async (req, res) => {
    const { action, _id } = req.body
    // return console.log(req.body)
    let operation =
      action === 'addFav'
        ? { $push: { favs: req.user._id } }
        : action === 'deleteFav'
        ? { $pull: { favs: req.user._id } }
        : null

    try {
      await Product.findOneAndUpdate({ _id }, operation, { new: true })
      let products = await Product.find()
      res.json({ success: true, response: products })
    } catch (error) {
      console.log(error)
      res.json({ succes: false, error: error.message })
    }
  },
  manageCart: async (req, res) => {
    const { product, action } = req.body
    let searchOption =
      action === 'changeQuantity'
        ? { 'cart.productId': product.productId }
        : { _id }
    let operation =
      action === 'add'
        ? { $push: { cart: product } }
        : action === 'delete'
        ? { $pull: { cart: product } }
        : action === 'setCart'
        ? { $set: { cart: product } }
        : { $set: { 'cart.$.quantity': product.quantity } }
    let options = { new: true }
    try {
      let user = await User.findOneAndUpdate(searchOption, operation, options)
      res.json({
        success: true,
        user: {
          firstName: user.data.firstName,
          src: user.data.src,
          google: user.data.google,
          admin: user.data.admin,
        },
        userData: user,
      })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
}

module.exports = productControllers
