const express = require('express');
const router = express.Router();
const Post = require('../models/Posts')
const Users = require('../models/Users');
const verifyToken = require('../middlewares/verifyToken')


router.get('/getAllPosts',verifyToken,(req, res) => {
    const Posts= Post.find();
    Posts.then((data)=>{
        res.send({result:data})
    })
    .catch((e)=>{
        res.send({result:e.message})
    })
})


router.post('/addPost', verifyToken, (req, res) => {
    const postData=req.body;
    const newPost=new Post(postData);
   
       newPost.save().then(() => {

           res.send({result: "Post added successfully"})
       }).catch(e => {
           res.send({message: e.message});
       })
   })



//    router.post('/updatePost',verifyToken,(req,res)=>{
//        const id = req.body.id
//        const post_to_update = new Post.update({_id:id},{$set:{volunteers:[{id:'aijaz'}]}})

//    })

router.post('/updatePost',verifyToken,(req,res)=>{
    const id =req.body.id
    const  volunteer = req.body.volunteer;
    console.log(volunteer,"volunteer")
    Post.update({_id:id},{$push:{volunteer}})
    .then(()=>{
        res.send({message:"user updated"});
    })
    .catch((e)=>{
        res.send({message:e.message})
    })
})


router.post('/getPost',verifyToken,(req,res)=>{
    const id =req.body.id
    Post.find({_id:id})
    .then((data)=>{
        res.send({result:data});
    })
    .catch((e)=>{
        res.send({message:e.message})
    })
})


router.post('/addComment',verifyToken,(req,res)=>{
    const id = req.body.id
    const  comment = req.body.comment;
    Post.update({_id:id},{$push:{comments:comment}})
    .then(()=>{
        res.send({message:"comment sent"});
    })
    .catch((e)=>{
        res.send({message:e.message})
    })
})

router.post('/myposts',verifyToken,(req,res)=>{
    const id = req.body.id
    Post.find({userId:id})
    .then((data)=>{
        res.send({result:data})
    }).catch(error=>res.send({error}))
})

router.post('/updateStatus',verifyToken,(req,res)=>{
    const id = req.body.id
    let volunteer = req.body.vol
    Post.updateOne({_id:id},{$set:{volunteer:volunteer}})
    .then((data)=>{
        res.send({result:data})
    }).catch(error=>res.send({error}))
})




module.exports = router;