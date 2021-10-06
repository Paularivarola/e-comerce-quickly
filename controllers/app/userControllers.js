const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userControllers = {
  signUp: async (req, res) => {
    const { firstName, lastName, password, email, google, src } = req.body
    const pw = bcrypt.hashSync(password)
    try {
      if (await User.findOne({ 'data.email': email })) throw new Error('Ya estás registrado')
      let newUser = new User({
        data: { firstName, lastName, password: pw, email, google },
      })
      let picture
      if (req.files) {
        const { fileImg } = req.files
        picture = `${newUser._id}.${fileImg.name.split('.')[fileImg.name.split('.').length - 1]}`
        fileImg.mv(`${__dirname}/../../assets/${newUser._id}.${fileImg.name.split('.')[fileImg.name.split('.').length - 1]}`, (err) => {
          if (err) return console.log(err)
        })
      } else {
        picture = src ? src : 'assets/user.png'
      }
      newUser.data.src = picture
      await newUser.save()
      const token = jwt.sign({ ...newUser }, process.env.SECRETORKEY)
      res.json({
        success: true,
        user: {
          firstName,
          src: picture,
          google: newUser.data.google,
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
          google: user.data.google,
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

    let operation = 
    action === 'updateData'
    ? { ...updateUserData }
    : action === 'addFav'
    ? { $push: { favs: productId } }
    : action === 'deleteFav'
    ? { $pull: { favs: productId }}
    : action === 'addPaymentCard'
    ? { $push: { paymentCards: newPaymentCard }}
    : action === 'deletePaymentCard'
    ? { $pull: { paymentCards: { _id: paymentCardId } }}
    : action === 'addAddress'
    ? { $push: { addresses: newAddress } }
    : action === 'deleteAddress' 
    ? { $pull: { addresses: { _id: addressId } } }
    : null 

    let options = { new: true }
    try {
      if(!operation) throw new Error()
      let user = await User.findOneAndUpdate({ _id }, operation, options )
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
        google: req.user.data.google,
      },
      userData: req.user,
      token: req.body.token,
    })
  },
}

module.exports = userControllers
