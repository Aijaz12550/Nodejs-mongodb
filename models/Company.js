const mongo = require('mongoose')
const Schema = mongo.Schema
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const CompanySchema = Schema({
    user:{
        name:String,
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        }
    }
})


// password encryption........
CompanySchema.methods.comparePassword = function (password){
    const user = this
    return bcrypt.compareSync(password, user.password)
}

// generate token
CompanySchema.methods.generateToken = async function ( ){
    const user = this;
    const token = jwt.sign({_id:user._id}, "aijaz", {})
    user.token = token

    await user.save()
    return;
}

// 