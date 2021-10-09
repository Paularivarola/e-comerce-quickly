const Product = require('../../models/Product')
const bcrypt = require('bcryptjs')
const adminProductControllers = {
  createProduct: async (req, res) => {
    const { name, description, price, category, ingredients, stock } = req.body
    const { key } = req.user.data.admin
    try {
      const match = key && bcrypt.compareSync(process.env.SECRETORKEY, key)
      if (!match) throw new Error('key error')
      let newProduct = new Product({
        name,
        description,
        category,
        price,
        ingredients,
        stock,
        extras: extras || false,
        papas: papas || false,
      })
      let picture
      console.log(req.files)
      const { img } = req.files
      picture = `${newProduct._id}.${
        img.name.split('.')[img.name.split('.').length - 1]
      }`
      img.mv(
        `${__dirname}/../../assets/products/${newProduct._id}.${
          img.name.split('.')[img.name.split('.').length - 1]
        }`,
        (err) => {
          if (err) return console.log(err)
        }
      )

      newProduct.img = picture
      await newProduct.save()
      res.json({
        success: true,
        response: newProduct,
      })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
  updateProduct: async (req, res) => {
    const { key } = req.user.data.admin
    try {
      const match = key && bcrypt.compareSync(process.env.SECRETORKEY, key)
      if (!match) throw new Error('key error')
      const product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true }
      )
      res.json({ success: true, response: product })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
  deleteProduct: async (req, res) => {
    const { key } = req.user.data.admin
    try {
      let match = key && bcrypt.compareSync(process.env.SECRETORKEY, key)
      if (!match) throw new Error('key error')
      await Product.findOneAndDelete({ _id: req.params.id })
      res.json({ success: true })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
}

module.exports = adminProductControllers
