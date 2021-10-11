const express = require('express')
const adminProductControllers = require('../controllers/admin/adminProductControllers')
const adminUserControllers = require('../controllers/admin/adminUserControllers')
const adminOrderControllers = require('../controllers/admin/adminOrderControllers')
const adminReviewControllers = require('../controllers/admin/adminReviewControllers')
const passport = require('../config/passport')

const router = express.Router()

// PRODUCTS
router
  .route('/producto/:id')
  .put(
    passport.authenticate('jwt', { session: false }),
    adminProductControllers.updateProduct
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    adminProductControllers.deleteProduct
  )

router
  .route('/productos')
  .post(
    passport.authenticate('jwt', { session: false }),
    adminProductControllers.createProduct
  )

//USERS
router
  .route('/user/:id')
  .put(
    passport.authenticate('jwt', { session: false }),
    adminUserControllers.updateUser
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    adminUserControllers.deleteUser
  )

router
  .route('/users')
  .post(passport.authenticate('jwt', { session: false }), adminUserControllers.createAdminUser)
  .get(passport.authenticate('jwt', { session: false }), adminUserControllers.getUsers)
// .put(passport.authenticate('jwt', { session: false }), adminUserControllers.resetUsers)

//ORDERS
router
  .route('/order/:id')
  .put(
    passport.authenticate('jwt', { session: false }),
    adminOrderControllers.updateOrder
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    adminOrderControllers.deleteOrder
  )

router
  .route('/orders')
  .get(
    passport.authenticate('jwt', { session: false }),
    adminOrderControllers.getOrders
  )

//REVIEWS
router
  .route('/review/:id')
  .put(
    passport.authenticate('jwt', { session: false }),
    adminReviewControllers.updateReview
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    adminReviewControllers.deleteReview
  )

router
  .route('/reviews')
  .get(
    passport.authenticate('jwt', { session: false }),
    adminReviewControllers.getReviews
  )

module.exports = router
