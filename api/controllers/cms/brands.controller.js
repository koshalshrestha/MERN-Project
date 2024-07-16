const {Brand} = require("@/models")

const {errorMsg} = require("@/lib")


class BrandsCtrl{
    index = async (req, res, next) => {
        try{
            const brands = await Brand.find()
            res.send(brands)}
        catch(error){
            errorMsg(next, error)
        }
    }

    store = async(req, res, next) => {
        try{
            let {name, status} = req.body

            await Brand.create({name, status})

            res.send({
                message: 'Brand added'
            })
        }
        catch(error){
            errorMsg(next, error)
        }
    }

    show = async(req, res, next) => {
        try{
            const {id} = req.params
            const brand = await Brand.findById(id)

            if(brand){
                res.send(brand)
            }else{
                next({
                    message: 'Brand not found',
                    status: 404
                })
            }
        }
        catch(error){
           errorMsg(next, error) 
        }
    }

    update = async(req, res, next) => {
        try{
            const {id} = req.params
            const {name, status} = req.body

            const brand = await Brand.findById(id)
            if(brand){
                await Brand.findByIdAndUpdate(id, {name, status})

                res.send({
                    message: 'Brand updated'
                })
            }else{
                next({
                    message: 'Brand not found',
                    status: 404
                })
            }
        }
        catch(error){
            errorMsg(next, error)
        }
    }

    destroy = async(req, res, next) => {
        try{
            const {id} = req.params
            const brand = await Brand.findById(id)

            if(brand) {
                await Brand.findByIdAndDelete(id)
                res.send({
                    message: 'Brand deleted'
                })
            }else{
                next({
                    message: 'Brand not found',
                    status: 404
                })
            }
        }
        catch(error){
            errorMsg(next, error)
        }
    }
}

module.exports = new BrandsCtrl()