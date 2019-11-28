const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UsersSchema = new Schema({
    name: String,
    
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true,
    },
    type:{
        type:String,
        required:true
    },
    token:String,
    myjobs:[{
        type:Schema.Types.ObjectId,
        ref:'Jobs'
    }],
    savedJobs:[{
        type:Schema.Types.ObjectId,
        ref:'Jobs'
    }]

    
})



// ----------------------------------------------------------CV

const CvSchema = new Schema({
    _id:Schema.Types.ObjectId,
    name:String,
    des:String,
    degree:String,
    year:String,
    skills:String,
    experience:[{
        duration:String,
        designation:String,
        organization:String,
    }]
})




UsersSchema.methods.comparePassword = function (password) {
    const user = this;

    return bcryptjs.compareSync(password, user.password);
}

UsersSchema.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, "aijaz", {})
    user.token = token;

    await user.save();
    return;
}

UsersSchema.methods.removeToken = async function (token) {
    const user = this;

    await user.findOneAndUpdate({token}, { token: null });
    return;
}

//Hook that will run before (new Users()).save()
UsersSchema.pre("save", function (next) {
    const user = this;

    if (user.isModified('password')) {
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(user.password, salt);

        user.password = hash;
    }

    next();
})



const Cv = mongoose.model('Cv',CvSchema)

const Users = mongoose.model('Users', UsersSchema);

module.exports = {Users,Cv};