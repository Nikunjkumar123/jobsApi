const express = require('express');
const routes = express.Router();

const  {getAllJobs,getJob,createJob,updateJob,deleteJob} = require('../controllers/jobs.js');

routes.route('/').post(createJob).get(getAllJobs)
routes.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)

module.exports = routes ;