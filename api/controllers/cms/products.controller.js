const {Product, Category, Brand} = require('@/models')

const {errorMsg} = require('@/lib')

const { unlinkSync } = require('node:fs')

class ProductsCtrl{
    index = async (req, res, next) =>{
        try{
            //const id = req.user._id
            let products = await Product.aggregate().lookup({
                from: 'categories',
                localField: 'categoryId',
                foreignField: '_id',
                as: 'category'
            })
            .lookup({
                from: 'brands',
                localField: 'brandId',
                foreignField: '_id',
                as: 'brand'
            }) 

            for(let i in products){
                products[i].category = products[i].category[0]
                products[i].brand = products[i].brand[0]
            }

            res.send(products)

        } catch(error){
            errorMsg(next, error)
        }
    }
    store = async (req, res, next) => {
        try{
            let {name, description, summary, price, discountedPrice, categoryId, brandId, status, featured} = req.body

            let images = []
            
            for(let file of req.files){
                images.push(file.filename)
            }

            await Product.create({name, description, summary, price, discountedPrice: discountedPrice || 0 , categoryId, brandId, status, featured, images})
            res.send({
                message: 'Product added'
            })
        }
        catch(error){                   
            errorMsg(next, error)
        }
    }

    show = async(req, res, next)  =>{
        try{
            const {id} = req.params

            const product = await Product.findById(id)
            if(product) {
                res.send(product)
            }else{
                next({
                    message: 'Product not found',
                     status: 404
                })
            }
        }
        catch(error){
            errorMsg(next, error)
        }
    }

    update = async (req, res, next) => {
        try{
            const {id} = req.params
            const {name, description, summary, price, discountedPrice, categoryId, brandId, status, featured, images} = req.body

            const product = await Product.findById(id)

            if(product){
                let images = product.images;

                if(req.files.length > 0){
                    for(let file of req.files){
                        images.push(file.filename)
                    }
                }

                await Product.findByIdAndUpdate(id, {name, description, summary, price, discountedPrice: discountedPrice || 0, categoryId, brandId, status, featured, images})

                res.send({
                    message: 'Product updated'
                })
            } else{
                next({
                    message: 'Product not found',
                    status: 404
                })
            }
        }
        catch(error){
            errorMsg(next, error)
        }
    }

    destroy = async (req, res, next) => {
        try{ 
            const {id}= req.params

            const product = await Product.findById(id)

            if(product){

                for(let image of product.images){
                    unlinkSync(`uploads/${image}`)
                }
                await Product.findByIdAndDelete(id)

                res.send({
                    message: 'Product deleted'
                })
            } else{
                next({
                    message: 'Product not found',
                    status: 404
                })
            }
        }
        catch(error){
            errorMsg(next, error)
        }
    
    }

    image = async (req, res, next) => {
        try{ 
            const {id, filename}= req.params

            const product = await Product.findById(id)

            if(product){
                unlinkSync(`uploads/${filename}`)
            
                const images = product.images.filter(file => filename != file)

                await Product.findByIdAndUpdate(id, {images})
                res.send({
                    message: 'Product image deleted'
                })
            } else{
                next({
                    message: 'Product image not found',
                    status: 404
                })
            }
        }
        catch(error){
            errorMsg(next, error)
        }
    
    }
}

module.exports = new ProductsCtrl()