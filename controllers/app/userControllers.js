const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const transport = require("../../config/transport")

const userControllers = {
  signUp: async (req, res) => {
    const { firstName, lastName, password, email, google, src } = req.body
    const pw = bcrypt.hashSync(password)
    console.log(req.body)
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
          admin: user.data.admin,
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
    const { action, userData, productId, newPaymentCard, paymentCardId, newAddress, addressId } = req.body

    let operation =
      action === 'updateData'
        ? { ...userData }
        : action === 'addFav'
        ? { $push: { favs: productId } }
        : action === 'deleteFav'
        ? { $pull: { favs: productId } }
        : action === 'addPaymentCard'
        ? { $push: { paymentCards: newPaymentCard } }
        : action === 'deletePaymentCard'
        ? { $pull: { paymentCards: { _id: paymentCardId } } }
        : action === 'addAddress'
        ? { $push: { addresses: newAddress } }
        : action === 'deleteAddress'
        ? { $pull: { addresses: { _id: addressId } } }
        : null

    let options = { new: true }
    try {
      if (!operation) throw new Error()
      let user = await User.findOneAndUpdate({ _id }, operation, options)
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
        admin: req.user.data.admin,
      },
      userData: req.user,
      token: req.body.token,
    })
  },


  sendEmail: async (req, res) => {
    const { firstName, lastName, email } = req.body
    console.log(req.body.email)
    console.log(req.body.info)
    const htmlConfirm = `
    <table style="max-width: 700px; padding: 10px; margin:0 auto; border-collapse: collapse;">
    <div style="width: 100%;margin:20px 0; text-align: center;">
        <img style="width: 40%"  src="https://i.postimg.cc/W3FQgY9z/logo-Nuevo-png.png" />
    </div>

  <tr>
    <td style="background-color: #F0F3F5">
      <div style="color: #FE6849; margin: 4% 10% 2%; text-align: center;font-family: sans-serif">
        <h1 style="color: #FE6849; margin: 0 0 7px">¡Hola, Niqui !</h1>
       
<h2 style="color: #525252; margin: 0 10 7px; font-size: 28px; ">Te damos la bienvenida   </h2>
         
                  <br>
         
        </p>
        <h2 style="color: #FE6849;">Disfrutá tu comida favorita desde la comodidad de tu casa.</h2>
        <div style="width: 100%;margin:20px 0; text-align: center;">
          <img style="width: 80%; border-radius: 10%"  src="https://i.postimg.cc/SRZ97j2y/4676729.jpg" />
    </div>

        <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center; background-color: #FE6849;">
          <a style="text-decoration: none; color: white;" href=""><p style="color: #fff; font-size: 14px; text-align: center;">© Copyright 2021 | miComida.</p></a>	
        </div>
      </td>
  </tr>
</table> 
   ` 
        try {
          let options ={
           from:'miComida <micomidaweb@gmail.com>', //de
             to: email,     //para
             subject: 'esto es una prueba',
             html: htmlConfirm,
          }
          transport.sendEmail(options, (error, info) => {
             if (error) {
                throw Error()
             } else {
                res.json({ success: true })
             }
          })
       } catch (error) {
          res.json({ success: false })
       }

  },

}



module.exports = userControllers
