const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    port:465,
    host: 'smtp.gmail.com',
    auth:{
        pass: process.env.PASSWORD,
        user: process.env.EMAIL
    },
    tls: {rejectUnaauthorized: false}
})

module.exports = transport