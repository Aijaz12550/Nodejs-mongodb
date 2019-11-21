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
            applicant_id:String,
            status:String,
        }],

        actions:[
            {_id:Schema.Types.ObjectId,action:Boolean}
        ],

        hired:[{_id:String,timestamp:String}]

 
})

const Jobs = mongoose.model('Jobs',JobSchema)
const Company = mongoose.model('Company', CompanySchema);

module.exports = {Company,Jobs};
