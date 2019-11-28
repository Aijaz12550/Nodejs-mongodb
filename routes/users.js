const express = require('express');
const router = express.Router();
const {Users,Cv} = require('../models/Users');
const verifyToken = require('../middlewares/verifyToken');

//protected route
router.get('/getAll', verifyToken, (req, res) => {
    const users = Users.find();

    users.then((allUsers) => {
        res.send({result: allUsers})
    }).catch(e => {
        res.send({message: e.message});
    })
})

router.post('/register', (req, res) => {
    const userInfo = req.body;
    const user = new Users(userInfo);

    user.save().then((response) => {
        res.send({result: "Registered Successfully!"+response})
    }).catch(e => {
        res.send({message: e.message});
    })
})

router.post('/login', async (req, res) => {
    const userInfo = req.body;

    //check email
    const user = await Users.findOne({email: userInfo.email});

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
    const cv = req.body.cv
    console.log('~~cv add route~~',)
    const cvAdded = new Cv(cv)
    cvAdded.save().then( data => {
        res.send({result:data})
    }).catch( e => {
        res.send({error:e.message})
    })
})

// ---------------------------------end



// ------------------------------------------update-cv
router.post('/updatecv',verifyToken,( req,res ) => {
    const id = req.body.cv._id
    const cv = req.body.cv

    Cv.updateOne({_id:id},{$set:cv})
    .then( data => {
        res.send({result:data})
    }).catch( e => {
        res.send({error:e.message})
    })
})

// ------------my cv
router.get('/mycv',verifyToken,(req,res) => {
    const id = req.headers.id
    Cv.findOne({_id:id})
    .then( data => {
        res.send({result:data})
    }).catch( e => {
        res.send({error:e.message})
    })
})

// --------------end



// --------

// ---------------------------------Users count

router.get('/countusers',verifyToken,(req,res)=>{
    Users.countDocuments({type:"Student"}).then( data => {
        console.log('count',data)
        res.send({result:data})
    }).catch( e => {
        res.send({error:e.message})
    })
})

// -------------++++++++++++++
module.exports = router;