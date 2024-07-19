const {Review} = require("@/models")

const {errorMsg} = require("@/lib")


class ReviewsCtrl{
    index = async (req, res, next) => {
        try{
            let reviews = await Review.aggregate()
            .lookup({from: 'products', localField: 'productId', foreignField: '_id', as: 'product'})
            .lookup({from: 'users', localField: 'userId', foreignField: '_id', as: 'user'})
            
            for(let i in reviews){
                reviews[i].product = reviews[i].product[0]
                reviews[i].user = reviews[i].user[0]
            }            
            res.send(reviews)}
        catch(error){
            errorMsg(next, error)
        }
    }

    destroy = async(req, res, next) => {
        try{
            const {id} = req.params
            const review = await Review.findById(id)

            if(review) {
                await Review.findByIdAndDelete(id)
                res.send({
                    message: 'Review deleted'
                })
            }else{
                next({
                    message: 'Review not found',
                    status: 404
                })
            }
        }
        catch(error){
            errorMsg(next, error)
        }
    }

}

module.exports = new ReviewsCtrl()