const Order = require('../../models/Order')
const Product = require('../../models/Product')
const User = require('../../models/User')

const orderControllers = {
  createOrder: async (req, res) => {
    const { customerId, userId, purchased, paymentMethod, metadata, deliveryAddress } = req.body
    var date = new Date()
    var deliveryTime = new Date()
    date.setTime(date.getTime() - 180 * 60 * 1000)
    deliveryTime.setTime(date.getTime() - 150 * 60 * 1000)
    try {
      let newOrder = new Order({
        date,
        purchased,
        customerId,
        userId,
        metadata,
        paymentMethod,
        deliveryAddress,
        deliveryTime,
      })
      await newOrder.save()
      let userData = await User.findOneAndUpdate({ _id: userId }, { $push: { ordersId: newOrder._id }, $set: { cart: [] } }, { new: true })
        .populate({
          path: 'cart.productId',
          model: 'product',
        })
        .populate({ path: 'ordersId', model: 'order' })
      res.json({ success: true, response: { newOrder, userData } })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
  cancellOrder: async (req, res) => {
    try {
      let orderCancelled = await Order.findOneAndUpdate({ _id: req.params.id }, { $set: { status: 'Cancelado' } }, { new: true })
      orderCancelled.purchased.forEach(async (item) => {
        await Product.findOneAndUpdate({ _id: item.productId._id }, { $inc: { stock: item.totalAmount } }, { new: true })
      })
      let products = await Product.find()
      res.json({ success: true, response: { orderCancelled, products } })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
  getUserOrders: (req, res) => {
    res.json({ ordersId: req.user.ordersId })
  },
}

module.exports = orderControllers
