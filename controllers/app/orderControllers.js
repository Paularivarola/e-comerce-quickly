const Order = require('../../models/Order')
const User = require('../../models/User')

const orderControllers = {
  createOrder: async (req, res) => {
    const { customerId, userId, purchased, paymentMethod, metadata, deliveryAddress } = req.body
    const date = await new Date()
    const deliveryTime = new Date(date.getTime() + 30 * 60000)
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
    console.log(req.params.id)
    try {
      let orderCancelled = await Order.findOneAndUpdate({ _id: req.params.id }, { $set: { status: 'Cancelado' } }, { new: true })
      res.json({ success: true, response: { orderCancelled } })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
}

module.exports = orderControllers
