import express from "express";
import { deleteJob, getAllJobs, getMyJobs, postJob, singleJobDetails, updateMyJob } from "../controllers/jobController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/postjob", isAuthorized, postJob);
router.get("/myjobs", isAuthorized, getMyJobs);
router.put("/update/:abcd", isAuthorized, updateMyJob);
router.delete("/delete/:id", isAuthorized, deleteJob)
router.get("/:id", isAuthorized, singleJobDetails);

export default router; 
