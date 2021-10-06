const Order = require("../../models/Order");
const User = require("../../models/User");

const orderControllers = {
  createOrder: async (req, res) => {
    const { products, delivery, paymentMethod } = req.body;
    const date = new Date();
    try {
      let newOrder = new Order({
        date,
        products,
        customerId: _id,
        paymentMethod,
        delivery,
      });
      await newOrder.save();
      if(req.user){
        const { _id } = req.user;
       let userData =  await User.findOneAndUpdate(
          { _id },
          { $push: { ordersId: newOrder._id } },
          { new: true }
        );
        res.json({ success: true, response: {newOrder,userData} })
      }
      res.json({ success: true, response: newOrder });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
  cancellOrder: async (req, res) => {
    const { orderId } = req.body;
    try {
      let orderCancelled = Order.findOneAndUpdate(
        { _id: orderId },
        { $set: { status: "Cancelado" } },
        { new: true }
      );
      res.json({ succes: true, response: orderCancelled });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
};

module.exports = orderControllers;
