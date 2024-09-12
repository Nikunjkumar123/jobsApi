const Job = require('../models/Job.js');
const {BadRequestError,NotFoundError} = require('../errors');

const getAllJobs = async(req,res)=>{
    const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(201).json({jobs,count:jobs.length});
}
const getJob = async(req,res)=>{
    const {user:{userId},params:{id:jobid}} = req
    const job = await Job.findOne({
        _id:jobid,createdBy:userId
    })
    if(!job){
        throw new NotFoundError('No job found')
    }
    res.json({job})
}
const createJob = async(req,res)=>{
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(201).json({job});
}
const updateJob = async(req,res)=>{
    const {company,position}= req.body;
    const {user:{userId},params:{id:jobid}} = req
    if(!company || !position){
        throw new BadRequestError('pls fill company or position')
    }
    const job = await Job.findOneAndUpdate({_id:jobid, createdBy:userId},req.body,{new:true,runValidators:true})
    if(!job){
        throw new NotFoundError('No job found')
    }
    res.send('update successfully');
}
const deleteJob = async(req,res)=>{
    const {
        user:{userId},
        params:{id:jobid}
        } = req
    const job = await Job.findOneAndRemove({_id:jobid, createdBy:userId}
    )
    if(!job){
        throw new NotFoundError('No job found')
    }
    res.send('Job delete successfully');
}

module.exports = {getAllJobs,getJob,createJob,updateJob,deleteJob};