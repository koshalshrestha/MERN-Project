const { Router } = require('express')
const productRoutes = require('./products.routes.js')
const mixRoutes = require('./mix.routes.js')

const router = Router()

router.use('/products', productRoutes)

router.use(mixRoutes)

module.exports = router
