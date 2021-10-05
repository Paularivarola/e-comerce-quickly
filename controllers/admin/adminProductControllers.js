const Product = require("../../models/Product");

const adminProductControllers = {
  createProduct: async (req, res) => {
    const { name, description, price, category, ingredients, stock } = req.body;
    const { key } = req.user.admin;
    try {
      const match = key && bcrypt.compareSync(process.env.SECRETORKEY, key);
      if (!match) throw new Error("key error");
      let newProduct = new Product({
        name,
        description,
        category,
        price,
        ingredients,
        stock,
      });
      newProduct = await newProduct.save();
      res.json({
        success: true,
        response: newProduct,
      });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
  updateProduct: async (req, res) => {
    const { key } = req.user.admin;
    try {
      const match = key && bcrypt.compareSync(process.env.SECRETORKEY, key);
      if (!match) throw new Error("key error");
      const product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true }
      );
      res.json({ success: true, response: product });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    const { key } = req.user.admin;
    try {
      let match = key && bcrypt.compareSync(process.env.SECRETORKEY, key);
      if (!match) throw new Error("key error");
      await Product.findOneAndDelete({ _id: req.params.id });
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
};

module.exports = adminProductControllers;
