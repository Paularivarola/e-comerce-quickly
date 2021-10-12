const express = require('express')
const adminProductControllers = require('../controllers/admin/adminProductControllers')
const adminUserControllers = require('../controllers/admin/adminUserControllers')
const adminOrderControllers = require('../controllers/admin/adminOrderControllers')
const adminReviewControllers = require('../controllers/admin/adminReviewControllers')
const passport = require('../config/passport').authenticate('jwt', { session: false })

const router = express.Router()

// PRODUCTS
router.route('/producto/:id').put(passport, adminProductControllers.updateProduct).delete(passport, adminProductControllers.deleteProduct)

router.route('/productos').post(passport, adminProductControllers.createProduct)

//USERS
router.route('/user/:id').put(passport, adminUserControllers.updateUser).delete(passport, adminUserControllers.deleteUser)

router.route('/users').post(passport, adminUserControllers.createAdminUser).get(passport, adminUserControllers.getUsers)
// .put(passport, adminUserControllers.resetUsers)

//ORDERS
router.route('/order/:id').put(passport, adminOrderControllers.updateOrder).delete(passport, adminOrderControllers.deleteOrder)

router.route('/orders').get(passport, adminOrderControllers.getOrders)

//REVIEWS
router.route('/review/:id').put(passport, adminReviewControllers.updateReview).delete(passport, adminReviewControllers.deleteReview)

router.route('/reviews').get(passport, adminReviewControllers.getReviews)

module.exports = router
