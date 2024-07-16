const { Router } = require('express')
const productRoutes = require('./products.routes.js')

const router = Router()

router.use('/products', productRoutes)

module.exports = router
