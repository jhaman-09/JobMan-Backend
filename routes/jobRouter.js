import express from "express";
import { deleteJob, getAllJobs, getMyJobs, postJob, updateMyJob } from "../controllers/jobController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/postjob", isAuthorized, postJob);
router.get("/myjobs", isAuthorized, getMyJobs);
router.put("/updatejob/:abcd", isAuthorized, updateMyJob);
router.delete("/deletejob/:id", isAuthorized, deleteJob)

export default router; 
