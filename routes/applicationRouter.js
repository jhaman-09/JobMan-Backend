import express from 'express'
import { applyForJobApplication, employerGetAllApplications, jobSeekerDeleteJobApplication, JobSeekerGetAllApplications } from '../controllers/applicationController.js';
import {isAuthorized} from '../middlewares/auth.js'
const router = express.Router();

router.get("/employee/getall", isAuthorized, employerGetAllApplications);
router.get("/jobseeker/getall", isAuthorized, JobSeekerGetAllApplications)
router.delete('/jobseeker/delete/:id', isAuthorized, jobSeekerDeleteJobApplication)
router.post("/jobseeker/post", isAuthorized, applyForJobApplication);

export default router;