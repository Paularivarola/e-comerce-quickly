const express = require('express')
import productControllers from '../controllers/productControllers'
import userControllers from '../controllers/userControllers'

const router = express.Router()


// PRODUCTS
router.route('/producto/:id')
    .get(productControllers.readProduct)
    .put(productControllers.updateProduct)
    .delete(productControllers.deleteProduct)

router.route('/productos')
    .post(productControllers.createProduct)
    .get(productControllers.readAll)

// USERS
router.route('/user/:id')
    .get(userControllers.readUser)
    .update(userControllers.updateUser)
    .delete(userControllers.deleteUser)

router.route('/users')
    .post(userControllers.createUser)
    .get(userControllers.readAllUsers)

module.exports = router