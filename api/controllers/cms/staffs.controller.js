const { User } = require("@/models")
const bcrypt = require('bcryptjs')
const { errorMsg, validationError} = require("@/lib")

class StaffCtrl {
    index = async(req, res, next) => {
        try{
            const staffs = await User.find({role:'staff'})

            res.send(staffs) 
        }catch(error){
            errorMsg(next, error)
        }
       
    }
    store = async(req, res, next) => {
        try{
            let { name, email, password, confirmPassword, phone, address, status} = req.body

            if(password == confirmPassword){
                const hash = bcrypt.hashSync(password, 10)

                await User.create({
                    name, email, password: hash, phone, address, status, role: 'staff'
                })

                res.send({
                    message: 'Staff added'
                })
            }else{
                validationError(next, {
                    password: 'The password is not confirmed'
                })
            }
        } catch (error){
            errorMsg(next, error)
        }
    }
    
    show = async(req, res, next) => {
        try{
            const { id } = req.params

            const staff = await User.findById(id)

            if(staff){
                res.send(staff)
            }else{
                next({
                    message: 'Staff not found',
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
            const { name, phone, address, status } = req.body

            const { id } = req.params

            const staff = await User.findById(id)

            if(staff){

                await User.findByIdAndUpdate(id, {name, phone, address, status})
                res.send({
                    message: 'Satff updated'
                })
            }else{
                next({
                    message: 'Staff not found',
                    status: 404
                })
            }
        }catch(error){
            errorMsg(next, error)
        }
    }
    destroy = async(req, res, next) => {
        try{
            const { id } = req.params

            const staff = await User.findById(id)

            if(staff){

                await User.findByIdAndDelete(id)
                res.send({
                    message: 'Satff deleted'
                })
            }else{
                next({
                    message: 'Staff not found',
                    status: 404
                })
            }
        }catch(error){
            errorMsg(next, error)
        }
    }
}

module.exports = new StaffCtrl;