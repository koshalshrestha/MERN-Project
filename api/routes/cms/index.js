const { Router } = require('express');
const staffsRoutes = require('./staffs.routes.js');
const customersRoutes = require('./customers.routes.js');
const brandsRoutes = require('./brands.routes.js')
const categoriesRoutes = require('./categories.routes.js')
const productsRoutes = require('./products.routes.js')
const reviewsRoutes = require('./reviews.routes.js')
const odersRoutes = require('./orders.routes.js')
const { adminOnly } = require('@/lib');

const router = Router()

router.use('/staffs', adminOnly, staffsRoutes)

router.use('/customers', customersRoutes)

router.use('/brands', brandsRoutes)

router.use('/categories', categoriesRoutes)

router.use('/products', productsRoutes)

router.use('/reviews', reviewsRoutes)

router.use('/orders', odersRoutes)

module.exports =  router;
