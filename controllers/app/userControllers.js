const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const stripe = require('stripe')(
  'sk_test_51JiHmiD8MtlvyDMX4r6FFdMzuJU3h60v7z60iYIo1n2u4b5PeWUzzigyKCiPpMkoHXIJ4u0SWDvjsQ3BTXPz0wpn00mAvDx3wa'
)

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400
}
const transport = require('../../config/transport')

const userControllers = {
  signUp: async (req, res, next) => {
    const { firstName, lastName, password, email, google, src } = req.body
    const pw = bcrypt.hashSync(password)
    try {
      if (await User.findOne({ 'data.email': email }))
        throw new Error('Ya estás registrado')
      let newUser = new User({
        data: { firstName, lastName, password: pw, email, google },
      })
      let picture
      if (req.files) {
        const { fileImg } = req.files
        picture = `${newUser._id}.${
          fileImg.name.split('.')[fileImg.name.split('.').length - 1]
        }`
        fileImg.mv(
          `${__dirname}/../../assets/${newUser._id}.${
            fileImg.name.split('.')[fileImg.name.split('.').length - 1]
          }`,
          (err) => {
            if (err) return console.log(err)
          }
        )
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
          google: google,
        },
        userData: newUser,
        token,
      })
      return next()
    } catch (error) {
      console.log(error)
      error.message.includes('Google')
        ? res.json({ error: [{ message: error.message }] })
        : res.json({ success: false, error: error.message })
    }
  },
  logIn: async (req, res) => {
    const { email, password, google } = req.body
    try {
      let user = await User.findOne({ 'data.email': email })
      if (!user)
        throw new Error('No encotramos una cuenta asociada a ese email')
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
    const {
      action,
      userData,
      newPaymentCard,
      paymentCardId,
      newAddress,
      addressId,
      password,
      currentPassword,
    } = req.body
    let src
    if (req.files) {
      const { fileImg } = req.files
      src = `${_id}v${req.user.__v + 1}.${
        fileImg.name.split('.')[fileImg.name.split('.').length - 1]
      }`
      fileImg.mv(
        `${__dirname}/../../assets/${_id}v${req.user.__v + 1}.${
          fileImg.name.split('.')[fileImg.name.split('.').length - 1]
        }`,
        (err) => {
          if (err) {
            res.json({ success: false, error: err.message })
            return console.log(err)
          }
        }
      )
    }

    let operation =
      action === 'updateData'
        ? {
            $set: {
              'data.firstName': userData.firstName,
              'data.lastName': userData.lastName,
            },
          }
        : action === 'updatePass'
        ? { $set: { 'data.password': password } }
        : action === 'addPaymentCard'
        ? { $push: { paymentCards: newPaymentCard } }
        : action === 'deletePaymentCard'
        ? { $pull: { paymentCards: { id: paymentCardId } } }
        : action === 'addAddress'
        ? { $push: { addresses: newAddress } }
        : action === 'deleteAddress'
        ? { $pull: { addresses: { _id: addressId } } }
        : { $set: { 'data.src': src, __v: req.user.__v + 1 } }

    let options = { new: true }
    try {
      if (!operation) throw new Error()
      if (
        action === 'updatePass' &&
        !bcrypt.compareSync(currentPassword, req.user.data.password)
      )
        throw new Error('Contraseña incorrecta')
      let user = await User.findOneAndUpdate({ _id }, operation, options)
      res.json({
        success: true,
        user: {
          firstName: user.data.firstName,
          src: user.data.src,
          google: user.data.google,
          admin: user.data.admin,
        },
        userData: user,
      })
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
  pay: async (req, res) => {
    const { items } = req.body
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1400,
      currency: 'usd',
    })
    res.json({
      clientSecret: paymentIntent.client_secret,
    })
  },

  sendEmail: async (req, res) => {
    const { firstName, email, action } = req.body
    console.log(req.body.email)
    try {
      let options = {
        from: 'miComida <micomidaweb@gmail.com>', //de
        to: email, //para
        subject: 'esto es una prueba',
        html: html(firstName, action),
      }
      transport.sendMail(options, (err, info) => {
        if (err) {
          return res.json({ success: false, response: err })
        }
        return res.json({ success: true, response: info })
      })
    } catch (error) {
      res.json({ success: false })
    }
  },
}

module.exports = userControllers

const html = (firstName, action) => {
  let html =
    action === 'sign'
      ? `
      <table style="max-width: 700px; padding: 10px; margin:0 auto; border-collapse: collapse;">
      <div style="width: 100%;margin:20px 0; text-align: center;">
          <img style="width: 40%"  src="https://i.postimg.cc/W3FQgY9z/logo-Nuevo-png.png" />
      </div>
  
    <tr>
      <td style="background-color: #F0F3F5">
        <div style="color: #FE6849; margin: 4% 10% 2%; text-align: center;font-family: sans-serif">
          <h1 style="color: #FE6849; margin: 0 0 7px">¡Hola, ${firstName} !</h1>
         
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
      : action === 'orderConfirm'
      ? ` <table style="max-width: 700px; padding: 10px; margin:0 auto; border-collapse: collapse;">
     <div style="width: 100%;margin:20px 0; text-align: center;">
         <img style="width: 40%"  src="https://i.postimg.cc/W3FQgY9z/logo-Nuevo-png.png" />
     </div>
     
     <tr>
     <td style="background-color: #F0F3F5">
       <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
         
         <h2 style="color: #525252; text-align:center; font-size: 30px;">¡Gracias, Niqui! </h2>
         <h1 style="color: #FE6849; margin: 0 0 7px; text-align:center">Tu pedido ha sido confirmado!</h1>
       
     <div style="width: 100%;margin:20px 0; text-align: center;">
     <img style="width: 60%; border-radius: 100%"  src="https://i.postimg.cc/9Ftccwcp/imagenmujer-adobespark.png" />
     </div>
         <p style="margin: 2px; font-size: 15px; color: #000">
                   <br>
         </p>
         <h2 style="color: #525252;">Detalle del pedido:</h2>
           
           
         <table style="width: 100%; background-color: rgba(0, 0, 0, .1);">
           <thead style="background-color: #FE6849; color: #fff;">
     <tr>
     <th>producto</th>
     <th>cantidad</th>
     <th>precio</th>
     </tr>
     </thead>
     <tbody>
     <tr>
     <td>producto</td>
     <td style="text-align: center">1</td>
     <td style="text-align: center">$100</td>
     </tr>
     </tbody>
     <tfoot>
     <tr>
     <td>Metodo de pago</td>
     <td style="text-align: center"></td>
     <td style="text-align: center">-</td>
     </tr>
     <tr>
     <td>Total</td>
     <td style="text-align: center"></td>
     <td style="text-align: center">-</td>
     </tr>
     </tfoot>
     
     </table>
           <h2 style="color: #525252;">Dirección de facturación</h2>
                         <ul style="font-size: 15px;  margin: 10px 0">
                           <li style="color: #000;">Pedido a nombre:</li>
                           <li style="color: #000;">Dirección:</li>
                           <li style="color: #000;">Numero de contacto:</li>
         </ul>
         <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center; background-color: #FE6849;">
           <a style="text-decoration: none; color: white;" href=""><p style="color: #fff; font-size: 14px; text-align: center;">© Copyright 2021 | miComida</p></a>    
         </div>
       </td>
     </tr>
     </table>`
      : action === 'orderCancell'
      ? `<table style="max-width: 700px; padding: 10px; margin:0 auto; border-collapse: collapse;">
     <div style="width: 100%;margin:20px 0; text-align: center;">
         <img style="width: 40%"  src="https://i.postimg.cc/W3FQgY9z/logo-Nuevo-png.png" />
     </div>
     
     <tr>
     <td style="background-color: #F0F3F5">
       <div style="color: #FE6849; margin: 4% 10% 2%; text-align: center;font-family: sans-serif">
         <h1 style="color: #FE6849; margin: 0 0 7px">Tu pedido fue cancelado</h1>
        
     <h2 style="color: #525252; margin: 0 10 7px; font-size: 19px; ">Lamentamos mucho lo ocurrido, (Nombre). Estamos trabajando para que no vuelva a ocurrir.   </h2>
          
                   <br>
         
           <h2 style="color: #525252; margin: 0 10 7px; font-size: 19px; ">Queremos contarte que ya estamos gestionando la devolución de tu pedido y te enviaremos un correo más adelante con todos los detalles.   </h2>
                       <div style="width: 100%;margin:20px 0; text-align: center;">
           <img style="width: 50%; border-radius: 100%"  src="https://i.postimg.cc/c4SQm5D4/imagen-persona-adobespark.png" />
     </div>
         
         <h3 style="color: #FE6849;">¡Saludos!
     El equipo de LLUVIA DE COMIDA</h3>
     
         <p style="color: #525252">Descarga la app en tu teléfono iPhone • Android</p>
     <p style="color: #525252">Ante cualquier consulta, comunícate por Ayuda en Línea.</p>
     
         <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center; background-color: #FE6849;">
           <a style="text-decoration: none; color: white;" href=""><p style="color: #fff; font-size: 14px; text-align: center;">© Copyright 2021 | LLUVIADEComida.</p></a>    
         </div>
       </td>
     </tr>
     </table>`
      : null
  return html
}
