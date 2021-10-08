const express = require('express')
const userControllers = require('../controllers/app/userControllers')
const productControllers = require('../controllers/app/productControllers')
const orderControllers = require('../controllers/app/orderControllers')
const passport = require('passport').authenticate('jwt', { session: false })
const validatorSignUp = require('../controllers/middlewares/validatorSignUp')
//Validar con joi las actualizaciones de usuario

const router = express.Router()

//USERS
router.route('/user/signUp').post(userControllers.signUp) //validatorSignUp, userControllers.signUp
router.route('/user/logIn').post(userControllers.logIn)
router.route('/user/token').get(passport, userControllers.verifyToken)
router.route('/user').put(passport, userControllers.updateUser).delete(passport, userControllers.deleteUser)

// PRODUCTS
router.route('/products').get(productControllers.getProducts)
// .put(passport, productControllers.manageCart)

//ORDERS
router.route('/orders').post(orderControllers.createOrder).put(orderControllers.cancellOrder)

//EMAIL
router.route('/mail').post(passport, userControllers.sendEmail)

router.route('/create-payment-intent').post(userControllers.pay)
module.exports = router
