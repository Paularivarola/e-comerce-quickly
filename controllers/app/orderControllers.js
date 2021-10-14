const Order = require('../../models/Order')
const User = require('../../models/User')

const orderControllers = {
  createOrder: async (req, res) => {
    const { customerId, userId, purchased, paymentMethod, metadata } = req.body
    const date = new Date()
    try {
      let newOrder = new Order({
        date,
        purchased,
        customerId,
        userId,
        metadata,
        paymentMethod,
      })
      await newOrder.save()
      let userData = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { ordersId: newOrder._id }, $set: { cart: [] } },
        { new: true }
      )
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
    const { orderId } = req.body
    try {
      let orderCancelled = Order.findOneAndUpdate({ _id: orderId }, { $set: { status: 'Cancelado' } }, { new: true })
      res.json({ succes: true, response: orderCancelled })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
}

module.exports = orderControllers
