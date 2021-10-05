const User = require('../../models/User')
const bcrypt = require('bcryptjs')

const userControllers = {
  signUp: async (req, res) => {
    const { firstName, lastName, password, email, google } = req.body
    const pw = bcrypt.hashSync(password)
    try {
      if (await User.findOne({ email: email })) {
        throw new Error('Ya estás registrado con Google')
      }
      const newUser = new User({
        firstName,
        lastName,
        password: pw,
        email,
        google: google || false,
      })
      await newUser.save()
      const token = jwt.sign(newUser, process.env.SECRETORKEY)
      res.json({
        success: true,
        user: {
          firstName,
          src: 'assets/genericUser.jpg',
        },
        userData: newUser,
        token,
      })
    } catch (error) {
      error.message.includes('Google')
        ? res.json({ error: [{ message: error.message }] })
        : res.json({ success: false, error: error.message })
    }
  },
  logIn: async (req, res) => {
    const { email, password, google } = req.body
    try {
      let user = await User.findOne({ email: email })
      if (!user) throw new Error('No encotramos una cuenta asociada a ese email')
      if ((user.google && !google) || (user.facebook && !facebook)) {
        throw new Error('Debes iniciar sesión con Google')
      }
      let match = user && bcrypt.compareSync(password, user.password)
      if (!match) throw new Error('Contraseña incorrecta')
      const token = jwt.sign(user, process.env.SECRETORKEY)
      res.json({
        success: true,
        user: {
          firstName: user.firstName,
          src: user.src,
        },
        userData: user,
        token,
      })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
  updateUser: async (req, res) => {
    const { _id } = req.user
    const {
      action,
      updateUserData,
      productId,
      newPaymentCard,
      paymentCardId,
      newAddress,
      addressId,
    } = req.body

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
    const { _id, password } = req.user
    try {
      let match = bcrypt.compareSync(req.body.password, password)
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
        firstName: req.user.firstName,
        src: req.user.src,
      },
      userData: req.user,
      token: req.body.token,
    })
  },
}

module.exports = userControllers
