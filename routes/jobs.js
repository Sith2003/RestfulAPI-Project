import express from 'express';
import { getAllJobs, getJob, createJob, updateJob, deleteJob } from '../controllers/jobs.js'

const jobsRouter = express.Router();

jobsRouter.route('/').post(createJob).get(getAllJobs);
jobsRouter.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

export default jobsRouter;