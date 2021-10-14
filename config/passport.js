const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')

module.exports = passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETORKEY,
    },
    (payload, done) => {
      User.findOne({ _id: payload._doc._id })
        .populate({ path: 'cart.productId', model: 'product' })
        .populate({ path: 'ordersId', model: 'order' })
        .then((response) => {
          if (!response) {
            return done(null, false)
          }
          return done(null, response)
        })
        .catch((err) => done(err, false))
    }
  )
)
