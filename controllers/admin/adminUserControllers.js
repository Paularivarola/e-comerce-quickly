const User = require('../../models/User')
const bcrypt = require('bcryptjs')

const adminUserControllers = {
  createAdminUser: async (req, res) => {
    const { firstName, lastName, password, email } = req.body
    const { key } = req.user.data.admin
    console.log(req.body)
    const pw = bcrypt.hashSync(password)
    try {
      console.log('llego')
      // let match = key && bcrypt.compareSync(process.env.SECRETORKEY, key);
      // if (!match) throw new Error("key error");
      console.log(req.body)
      const nuevaKey = bcrypt.hashSync(process.env.SECRETORKEY)
      const newUser = new User({
        data: {
          firstName,
          lastName,
          password: pw,
          email,
          admin: { flag: true, key: nuevaKey },
        },
      })
      let user = await newUser.save()
      console.log('bien')
      res.json({
        success: true,
        response: user,
      })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
  getUsers: async (req, res) => {
    const { key } = req.user.data.admin
    try {
      let match = key && bcrypt.compareSync(process.env.SECRETORKEY, key)
      if (!match) throw new Error('key error')
      let users = await User.find()
      res.json({ success: true, response: users })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
  updateUser: async (req, res) => {
    const { key } = req.user.data.admin
    try {
      let match = key && bcrypt.compareSync(process.env.SECRETORKEY, key)
      if (!match) throw new Error('key error')
      let user = await User.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })
      res.json({ success: true, response: user })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
  deleteUser: async (req, res) => {
    const { key } = req.user.data.admin
    try {
      let match = key && bcrypt.compareSync(process.env.SECRETORKEY, key)
      if (!match) throw new Error('key error')
      await User.findOneAndDelete({ _id: req.params.id })
      console.log(req.params.id)
      console.log('llego')
      res.json({ success: true })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
}

module.exports = adminUserControllers
