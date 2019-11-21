const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    companyName :String,
    service:String,
    totalEmployees:Number,
    location:String,
    description:String,
    ownerId:String,

})



const Post = mongoose.model('Posts', PostSchema);

module.exports = Post;