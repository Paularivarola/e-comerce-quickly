const express = require('express')
const userControllers = require('../controllers/app/userControllers')
const productControllers = require('../controllers/app/productControllers')
const orderControllers = require('../controllers/app/orderControllers')
const ticketControllers = require('../controllers/app/ticketControllers')
const passport = require('passport').authenticate('jwt', { session: false })
const validatorSignUp = require('../controllers/middlewares/validatorSignUp')
//Validar con joi las actualizaciones de usuario

const router = express.Router()

//USERS
router.route('/user/signUp').post(validatorSignUp, userControllers.signUp, userControllers.sendEmail) //validatorSignUp, userControllers.signUp
router.route('/user/logIn').post(userControllers.logIn)
router.route('/user/token').get(passport, userControllers.verifyToken)
router.route('/user').put(passport, userControllers.updateUser).delete(passport, userControllers.deleteUser)

// PRODUCTS
router.route('/products').get(productControllers.getProducts).put(productControllers.manageCart)
router.route('/products/favs').put(passport, productControllers.favHandler)
router.route('/products/keep-cart').post(productControllers.keepCart)

//ORDERS
router.route('/orders').post(orderControllers.createOrder)
router.route('/order/:id').put(orderControllers.cancellOrder)

//EMAIL
// router.route('/mail').post(passport)

//TICKETS
router.route('/tickets').post(ticketControllers.createTicket).get(ticketControllers.getTickets)

router.route('/create-payment-intent').post(userControllers.paymentIntent)
router.route('/attach-payment-method').post(userControllers.attach)
router.route('/confirm-payment-intent').post(userControllers.confirmPayment)
module.exports = router
