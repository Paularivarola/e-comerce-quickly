const express = require('express')
const userControllers = require('../controllers/app/userControllers')
const productControllers = require('../controllers/app/productControllers')
const orderControllers = require('../controllers/app/orderControllers')
const passport = require('../config/passport').authenticate('jwt', {
  session: false,
})
const validatorSignUp = require('../controllers/middlewares/validator')
//Validar con joi las actualizaciones de usuario

const router = express.Router()

//USERS
router.route('/user/signUp').post(validatorSignUp, userControllers.signUp)
router.route('/user/logIn').post(userControllers.logIn)
router.route('/user/verifyToken').post(passport, userControllers.verifyToken)
router
  .route('/user')
  .put(passport, userControllers.updateUser)
  .delete(passport, userControllers.deleteUser)

// PRODUCTS
router
  .route('/products')
  .get(productControllers.getProducts)
  .put(passport, productControllers.manageCart)

//ORDERS
router
  .route('/orders')
  .post(orderControllers.createOrder)
  .put(orderControllers.cancellOrder)

// router
//   .route("/producto/:id")
//   .get(productControllers.readProduct)11
//   .put(productControllers.updateProduct)
//   .delete(productControllers.deleteProduct);

// router
//   .route("/productos")
//   .post(productControllers.createProduct)
//   .get(productControllers.readAll);

module.exports = router
