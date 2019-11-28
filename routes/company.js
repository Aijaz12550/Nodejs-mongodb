const express = require('express')
const router = express.Router();
const {Company,Jobs,Application, Action} = require('../models/Company')
const verifyToken = require('../middlewares/verifyToken')
const User = require('../models/Users')


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
    console.log('____id__',_id)
    Company.find({ownerId:_id}).populate("activeJobs")
    .then((data)=>{
        res.send({result:data})
        console.log("aaaa",data)
    }).catch(e=>{
        res.send({error:e.message})
    })
})

// -----end



// ----------------------Get All Companies
router.get('/alljobs',verifyToken,(req,res)=>{
    const comps = Jobs.find().populate('applications').populate('actions')
    comps.then( data => {
        console.log('33',data[0].actions)
        res.send({ result:data })
    }).catch( e => {
        res.send({ error:e.message })
    })
})

// ----------------end

// -------------------------------------reaction on job
router.post('/action',verifyToken,(req,res)=>{
    const id = req.body.id
    const actions = req.body.action;
    
    console.log('~~',req.body.action)

        Jobs.updateOne({_id:id},{$addToSet:{actions}})
        .then( data => {
            res.send({result:data})
        }).catch( e => {
            res.send({error:e.message})
        })
  
})

// ------------------------end


// -----------------------Job-update
router.post('/apply',verifyToken,(req,res)=>{
    const {job_id,application_id} = req.body

    Jobs.updateOne({_id:job_id},{$set:{applications:application_id}})
    .then( response => {
        res.send({result:response})
    }).catch( e => {
        res.send({error:e.message})
    })
})


// ------------------------Applicant detail----
// router.post('/applicants',verifyToken,(req,res)=>{
// console.log('~~~chala~~~')
//     User.find({_id:{$in:req.body.array}})
//     .then( data => {
//         console.log('__data--',data)
//         res.send({result:data})
//     }).catch( e => {
//         console.log('~~~error~~',e.message)
//     })
// })




// ---------------------Application---
router.post('/application',verifyToken,(req,res)=>{
    console.log('ee',req.body)
    const applica = new Application(req.body)
    applica.save().then( data => {
        res.send({result:data})
    }).catch( e => {
        res.send({error:e.message})
    })
})

// --------end ---



// ------------------------------------------get Appications
router.get('/getApplication',verifyToken,(req,res)=>{
    const job_id = req.headers.id
    const status = req.headers.status
    console.log('>>>',req.headers)
    Application.find({job_id,status}).populate('applicant_id')
    .then( data => {
        res.send({result:data})
    }).catch( e => {
        res.send({error:e.message})
    })
})



// -------------------------------update Applicatin status
router.post('/updateApplication',verifyToken, (req,res)=> {
    const id = req.body.id
    const status = req.body.status
    Application.updateOne({_id:id},{$set:{status}})
    .then( data => {
        res.send({result:data})
    }).catch( e => {
        res.send({error:e.message})
    })
})

// -------------end------------


// ---------------------------------companies count

router.get('/countcompanies',verifyToken,(req,res)=>{
    Company.countDocuments().then( data => {
        console.log('count',data)
        res.send({result:data})
    }).catch( e => {
        res.send({error:e.message})
    })
})






// ---------Action collection route----
router.post('/newAction',verifyToken,(req,res)=>{
console.log('chala')
    const actionAdded = new Action(req.body)
    actionAdded.save().then( data => {
        
        Jobs.updateOne({_id:data.job_id},{$addToSet:{actions:data._id}})
        .then( response => {
            res.send({result:response})
        })
    }).catch( e => {
        res.send({error:e.message})
    })
})

// -----end---

// --------------------------------update action

router.post('/updateAction',verifyToken,(req,res)=>{
    const action_id = req.body.id
    Action.deleteOne({_id:action_id})
    .then( data => {
        res.send({result:data})
    }).catch(e => {
        res.send({error:e.message})
    })
})


// ---------------------------------getting like 
router.post('/myjobs',verifyToken,(req,res)=>{
    const id = req.body.id
    Jobs.find({actions:id}).then( data => {
        console.log('dd',data)
    }).catch( e => {
        console.log('error',e)
    })
})

// ------end------



module.exports = router;