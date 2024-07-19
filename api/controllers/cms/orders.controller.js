const {Order, Detail} = require("@/models")

const {errorMsg} = require("@/lib")


class OrdersCtrl{
    index = async (req, res, next) => {
        try{
            let orders = await Order.aggregate()
                .lookup({from: 'users', localField: 'userId', foreignField: '_id', as: 'user'})

            for(let item in orders){
                orders[item].user = orders[item].user[0]


                let details = await Detail.aggregate()
                    .match({orderId: orders[item]._id})
                    .lookup({from: 'products', localField: 'productId', foreignField: '_id', as: 'product'})

                for( let i in details){
                    details[i].product = details[i].product[0]
                }

                orders[item] = {
                    ...orders[item],
                    details
                }
            }
            res.send(orders)
        }
        catch(error){
            errorMsg(next, error)
        }
    }

    update = async(req, res, next) => {
        try{
            const {id } = req.params
            const {status} = req.body

            await Order.findByIdAndUpdate(id, {status})

            res.send({
                message: 'Order updated'
            })
        }
        catch(error){
            errorMsg(next, error)
        }
    }

    destroy = async(req, res, next) => {
        try{
            const {id} = req.params
            const order = await Order.findById(id)

            if(order) {
                await Detail.deleteMany({orderId: id})
                await Order.findByIdAndDelete(id)
                res.send({
                    message: 'Order deleted'
                })
            }else{
                next({
                    message: 'Order not found',
                    status: 404
                })
            }
        }
        catch(error){
            errorMsg(next, error)
        }
    }

}

module.exports = new OrdersCtrl()