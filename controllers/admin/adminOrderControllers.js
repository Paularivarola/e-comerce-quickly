const Order = require("../../models/Order");

const adminOrderControllers = {
  getOrders: async (req, res) => {
    const { key } = req.user.admin;
    try {
      let match = key && bcrypt.compareSync(process.env.SECRETORKEY, key);
      if (!match) throw new Error("key error");
      let orders = await Order.find();
      res.json({ success: true, response: orders });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
  updateOrder: async (req, res) => {
    const { key } = req.user.admin;
    try {
      const match = key && bcrypt.compareSync(process.env.SECRETORKEY, key);
      if (!match) throw new Error("key error");
      const order = await Order.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true }
      );
      res.json({ success: true, response: order });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
  deleteOrder: async (req, res) => {
    const { key } = req.user.admin;
    try {
      let match = key && bcrypt.compareSync(process.env.SECRETORKEY, key);
      if (!match) throw new Error("key error");
      await Order.findOneAndDelete({ _id: req.params.id });
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
};

module.exports = adminOrderControllers;
