const {User} = require('@/models')

const {errorMsg, validationError} = require('@/lib')

const bcrypt = require('bcryptjs')

class CustomersCtrl{
    index = async (req, res, next) =>{
        try{
            //const id = req.user._id
            const cusomers = await User.find({role:'customer'})
            res.send(cusomers)

        } catch(error){
            errorMsg(next, error)
        }
    }

    store = async (req, res, next) =>{
        try{
            let { name, email, password, confirmPassword, phone, address, status} = req.body
            if(password == confirmPassword){
                const hash = bcrypt.hashSync(password, 10)

                await User.create({ 
                    name, email, password: hash, phone, address, status, role: 'customer'
                })

                res.send({
                    message: 'Customer added'
                })
            }
            else{
                validationError(next, {
                    password: 'password and confirm password should match'
                })
            }
        }
        catch(error){
            errorMsg(next, error)
        }
    }

    show = async(req, res, next)  =>{
        try{
            const {id} = req.params

            const customer = await User.findById(id)
            if(customer) {
                res.send(customer)
            }else{
                next({
                    message: 'Customer not found',
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
            const {name, phone, address, status} = req.body

            const customer = await User.findById(id)

            if(customer){
                await User.findByIdAndUpdate(id, {name, phone, address, status})

                res.send({
                    message: 'Customer updated'
                })
            } else{
                next({
                    message: 'Customer not found',
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

            const customer = await User.findById(id)

            if(customer){
                await User.findByIdAndDelete(id)

                res.send({
                    message: 'Customer deleted'
                })
            } else{
                next({
                    message: 'Customer not found',
                    status: 404
                })
            }
        }
        catch(error){
            errorMsg(next, error)
        }
    
    }
}

module.exports = new CustomersCtrl()