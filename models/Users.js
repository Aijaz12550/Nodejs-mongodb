const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UsersSchema = new Schema({
    fName: String,
    lName: String,
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
    // address: String,
    // age: Number,
    // friendIds: Array,
    bloodGroup:String,
    token: String,
    fcmToken:String,
    notification:Boolean,
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

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;