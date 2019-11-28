const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    companyName :String,
    service:String,
    totalEmployees:Number,
    location:String,
    description:String,
    ownerId:String,
    timestamp:String,

    closeJobs:[{id:String,ownerId:String}],
    activeJobs:[{
        type: Schema.Types.ObjectId,
        ref: "Jobs"
    }]
})


// ---------------------------JOBS SCHEMA------------------

const JobSchema = new Schema({
        
            timestamp:String,
            cId:String,
            title:String,
            required_qualification:String,
            experience:String,
            skills:String,
            positions:String,
            job_type:String,
            salary:String,
            job_responsibility:String,
 
        applications:[{
            type:Schema.Types.ObjectId,
            ref:'Application'
        }],

        actions:[{
            type:Schema.Types.ObjectId,
            ref:'Action'
        }],

        hired:[{_id:String,timestamp:String}]

 
})

// ----end----


// --------------------------------------application schema---

const Application_Schema = mongoose.Schema({
    applicant_id:{
        type:Schema.Types.ObjectId,
        ref:'Users'
    },
    company_id :Schema.Types.ObjectId,
    job_id:Schema.Types.ObjectId,
    status:String,
})

// --end----------

// ----------action schema----
const Action_Schema = mongoose.Schema({
    user_id:Schema.Types.ObjectId,
    job_id:Schema.Types.ObjectId,
    action:Boolean
})
// -------end




const Action = mongoose.model('Action',Action_Schema)
const Application = mongoose.model("Application", Application_Schema)
const Jobs = mongoose.model('Jobs',JobSchema)
const Company = mongoose.model('Company', CompanySchema);

module.exports = {Company,Jobs,Application,Action};
