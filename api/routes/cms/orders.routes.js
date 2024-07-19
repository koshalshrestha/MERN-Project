const { Router } = require('express')

const { Cms } = require('@/controllers')

const router = Router()

router.get('/', Cms.OrdersCtrl.index) 
    
router.route('/:id')
    .delete( Cms.OrdersCtrl.destroy)
    .put( Cms.OrdersCtrl.update)
    .patch( Cms.OrdersCtrl.update)


module.exports = router 