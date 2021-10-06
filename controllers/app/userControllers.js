const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userControllers = {
  signUp: async (req, res) => {
    const { firstName, lastName, password, email, google, src } = req.body
    const pw = bcrypt.hashSync(password)
    try {
      if (await User.findOne({ email })) throw new Error('Ya estás registrado')
      const newUser = new User({
        data: { firstName, lastName, password: pw, email, google: google || false, src: src || 'assets/genericUser.jpg' },
      })
      await newUser.save()
      const token = jwt.sign({ ...newUser }, process.env.SECRETORKEY)
      res.json({
        success: true,
        user: {
          firstName,
          src: src || '/assets/user.png',
        },
        userData: newUser,
        token,
      })
    } catch (error) {
      console.log(error)
      error.message.includes('Google') ? res.json({ error: [{ message: error.message }] }) : res.json({ success: false, error: error.message })
    }
  },
  logIn: async (req, res) => {
    const { email, password, google } = req.body
    try {
      let user = await User.findOne({ 'data.email': email })
      if (!user) throw new Error('No encotramos una cuenta asociada a ese email')
      if (user.data.google && !google) {
        throw new Error('Debes iniciar sesión con Google')
      }
      let match = user && bcrypt.compareSync(password, user.data.password)
      if (!match) throw new Error('Contraseña incorrecta')
      const token = jwt.sign({ ...user }, process.env.SECRETORKEY)
      res.json({
        success: true,
        user: {
          firstName: user.data.firstName,
          src: user.data.src,
        },
        userData: user,
        token,
      })
    } catch (error) {
      console.log(error)
      res.json({ success: false, error: error.message })
    }
  },
  updateUser: async (req, res) => {
    const { _id } = req.user
    const { action, updateUserData, productId, newPaymentCard, paymentCardId, newAddress, addressId } = req.body

    let operation
    switch (action) {
      case 'updateData':
        operation = { ...updateUserData }
        break
      case 'addFav':
        operation = {
          $push: { favs: productId },
        }
        break
      case 'deleteFav':
        operation = {
          $pull: { favs: productId },
        }
        break
      case 'addPaymentCard':
        operation = {
          $push: { paymentCards: newPaymentCard },
        }
        break
      case 'deletePaymentCard':
        operation = {
          $pull: { paymentCards: { _id: paymentCardId } },
        }
        break
      case 'addAddress':
        operation = {
          $push: { addresses: newAddress },
        }
        break
      case 'deleteAddress':
        operation = {
          $pull: { addresses: { _id: addressId } },
        }
        break
      default:
        throw new Error()
    }
    try {
      let user = await User.findOneAndUpdate({ _id }, operation, { new: true })
      res.json({ success: true, response: user })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
  deleteUser: async (req, res) => {
    const { _id, data } = req.user
    try {
      let match = bcrypt.compareSync(req.body.password, data.password)
      if (!match) throw new Error('Contraseña incorrecta')
      await User.findOneAndDelete({ _id })
      res.json({ success: true })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
  verifyToken: async (req, res) => {
    res.json({
      success: true,
      user: {
        firstName: req.user.data.firstName,
        src: req.user.data.src,
      },
      userData: req.user,
      token: req.body.token,
    })
  },
}

module.exports = userControllers
