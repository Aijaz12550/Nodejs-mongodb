const express = require('express')
const router = express.Router();
const {Company,Jobs} = require('../models/Company')
const verifyToken = require('../middlewares/verifyToken')


// ----------------------------- Add Company

router.post('/addCompany', verifyToken, (req, res) => {
    const postData=req.body;
    const newPost=new Company(postData);
   
       newPost.save().then(() => {

           res.send({result: "Post added successfully"})
       }).catch(e => {
           res.send({message: e.message});
       })
   })

// ----end


// --------------------------update-Company---------------

router.post('/updateCompany',verifyToken,(req,res)=>{
    console.log('up~~~req.body',req.body)
    let id = req.body.id;
    let jobId = req.body.jobId
    Company.updateOne({_id:id},{$addToSet:{activeJobs:jobId}})
    .then( response => {
        res.send({result:"Job Id Added.."+response})
    }).catch( e => {
        res.send({error:e.message})
    })

})

// ----------------------------------------------end

// ------------------------------Add Job
router.post('/addjob',verifyToken,(req,res)=>{
console.log("~~~body",req.body.job)
    const Job = req.body.job
    const id = req.body._id

    const newJob = new Jobs(req.body.job_detail)
    //  Company.update({_id:id},{$addToSet:{Jobs}},(err,raw)=>{
    //     console.log('~~error',err,raw)
    // })
    newJob.save().then((resu)=>{
        res.send({result:resu})
    })
    .catch(e=>{
        res.send({error:e.message})
    })
    
})

// ------end

// ----------------------------Get my Companies
router.post('/myCompanies',verifyToken,(req,res)=>{
    const _id = req.body._id

    Jobs.find({ownerId:_id}).populate("activeJobs")
    .then((data)=>{
        res.send({result:data})
        console.log("aaaa",data)
    }).catch(e=>{
        res.send({error:e.message})
    })
})

// -----end



// ----------------------Get All Companies
router.get('/allcompanies',verifyToken,(req,res)=>{
    const comps = Jobs.find()
    comps.then( data => {
        res.send({ result:data })
    }).catch( e => {
        res.send({ error:e })
    })
})

// ----------------end

// -------------------------------------reaction on job
router.post('/action',verifyToken,(req,res)=>{
    const id = req.body.id
    const actions = req.body.action;
    
    console.log('~~',req.body.action)

    if(req.body.test){

        Jobs.updateOne({_id:id},{$set:{actions:req.body.action}})
        .then( data => {
            console.log('~~',data)
            res.send({result:data})
        }).catch( e => {
            console.log('~~err',e)
            res.send({error:e.message})
        })
    }else{
        Jobs.updateOne({_id:id},{$addToSet:{actions}})
        .then( data => {
            res.send({result:data})
        }).catch( e => {
            res.send({error:e.message})
        })
    }
})

// ------------------------end


// -----------------------Job Application
router.post('/apply',verifyToken,(req,res)=>{
    const {job_id,application} = req.body
    Jobs.updateOne({_id:job_id},{$set:{applications:application}})
    .then( response => {
        res.send({result:response})
    }).catch( e => {
        res.send({error:e.message})
    })
})


module.exports = router;