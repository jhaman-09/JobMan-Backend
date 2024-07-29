import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Job } from "../models/jobSchema.js";
import ErrorHandler, { errorMiddleware } from "../middlewares/error.js";
import mongoose from "mongoose";

// Job Seeker can watch the availabe jobs
export const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

// Employee can only able to post job
export const postJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        "Job Seeker are not allowed to access this resource !",
        400
      )
    );
  }

  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(
      new ErrorHandler("Please Provide the Job details Properly", 400)
    );
  }

  if (!(salaryFrom || salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler(
        "Please Provide either Fixed Salary or Range Salary",
        400
      )
    );
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      new ErrorHandler(
        "Please Provide Either fixed Salary or Range Salary",
        400
      )
    );
  }

  const postedBy = req.user._id;

  const job = await Job.create({
    title,
    description,
    category,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    country,
    postedBy,
  });

  res.status(200).json({
    success: true,
    job,
    message: "Job Posted Successfully!",
  });
});

// watch All jobs posted by a Employee
export const getMyJobs = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        "Job Seeker are not allowed to access this resource !",
        400
      )
    );
  }

  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    status: true,
    myJobs,
  });
});

// Update the posted job by Employee
export const updateMyJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker")
    return next(
      new ErrorHandler(
        "Job Seekers are not allowed to access this reource !",
        400
      )
    );

  // here, abcd is Object id to which job has to be updated
  const { abcd } = req.params;
  console.log(abcd);

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(abcd)) {
    return next(new ErrorHandler("Invalid Job ID", 400));
  }

  const findedJob = await Job.findById(abcd);
  if (!findedJob) {
    return next(new ErrorHandler("Oops, Job Not Found!", 404));
  }

  const updatedJob = await Job.findByIdAndUpdate(abcd, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    status: true,
    updatedJob,
    message: "Job Updated Successfully",
  });
});

export const deleteJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        "Job Seeker are not allowed to access this resource !",
        400
      )
    );
  }

  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Oops, Job not found !", 404));
  }

  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Delete Successfully !",
  });
});
