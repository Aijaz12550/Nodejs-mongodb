const express = require('express');
const router = express.Router();
const users = require('../models/Users');
const verifyToken = require('../middlewares/verifyToken');

//protected route
router.get('/getAll', verifyToken, (req, res) => {
    const users = users.find();

    users.then((allUsers) => {
        res.send({result: allUsers})
    }).catch(e => {
        res.send({message: e.message});
    })
})

router.post('/register', (req, res) => {
    const userInfo = req.body;
    const user = new users(userInfo);

    user.save().then((response) => {
        res.send({result: "Registered Successfully!"+response})
    }).catch(e => {
        res.send({message: e.message});
    })
})

router.post('/login', async (req, res) => {
    const userInfo = req.body;

    //check email
    const user = await users.findOne({email: userInfo.email});

    if(!user) {
        res.send({message: "Invalid email or password!"});
    }

    //check password
    const matchPassword = user.comparePassword(userInfo.password);

    if(!matchPassword) {
        res.send({message: "Invalid email or password!"});
    }

    //generate token
    await user.generateToken();
    // await users.update({email:userInfo.email},{$set:{notification:true}})

    res.send({_id: user._id, email: user.email, token: user.token, name:user.name,type:user.type});


    // user.then((userObj) => {
        
    //     console.log('allUsers =-==>', allUsers)
    //     // res.send({result: "Registered Successfully!"})
    // }).catch(e => {
    //     res.send({message: e.message});
    // })
})


//fetch('url.com/users/314y781yieash')
router.post('/getUser', (req, res) => {
    //req.params.id
    const email = req.body.email;
    const users = Users.find({ email });

    users.then((allUsers) => {
        res.send({result: allUsers})
    }).catch(e => {
        res.send({message: e.message});
    })
})

router.post('/addUser', (req, res) => {
    const user = req.body;
    const newUser = new Users(user);

    newUser.save()
    .then(() => {
        res.send({message: "User added successfully!"})
    })
    .catch(e => {
        console.log('e ===>', e);
        res.send({message: e.message})
    })
})


router.post('/logout',(req,res)=>{
    console.log('logout chala')
    const id = req.body.id
    Users.updateOne({_id:id},{$set:{token:null,notification:false}})
    .then(()=>{
        res.send({message:"SignOut successful.."});
    })
    .catch((e)=>{
        res.send({message:e.message})
    })
})


// ------------------------------Add CV
router.post('/addcv',verifyToken,(req,res) => {
    const id = req.body.id
    const cv = req.body.cv
    users.updateOne({_id:id},{$set:{cv}})
    .then( data => {
        res.send({ result:"CV Added"})
    }).catch( e=>{
        res.send({ error:e.message})
    })
})

// ---------------------------------end

module.exports = router;