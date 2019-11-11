const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    bloodGroup: String,
    nUnits: String,
    urgency:String,
    country:String,
    selectedstate:String,
    selectedcity:String,
    hospital:String,
    relation:String,
    contact:Number,
    detail:String,
    userId:String,
    timeStamp:Number,
    donated:[{
        id:String,
        name:String,
    }],
    comments:[{
        id:String,
        name:String,
        comment:String,
    }],
    volunteer:[
       { 
           id:String,
        name:String,
        bloodGroup:String,
        status:'',
    }
    ]

})



const Post = mongoose.model('Posts', PostSchema);

module.exports = Post;