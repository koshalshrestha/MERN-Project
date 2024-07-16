const { Router } = require('express');
const staffsRoutes = require('./staffs.routes.js');
const customersRoutes = require('./customers.routes.js');
const brandsRoutes = require('./brands.routes.js')
const categoriesRoutes = require('./categories.routes.js')
const productsRoutes = require('./products.routes.js')
const { adminOnly } = require('@/lib/index.js');

const router = Router()

router.use('/staffs', adminOnly, staffsRoutes)

router.use('/customers', customersRoutes)

router.use('/brands', brandsRoutes)

router.use('/categories', categoriesRoutes)

router.use('/products', productsRoutes)

module.exports =  router;
