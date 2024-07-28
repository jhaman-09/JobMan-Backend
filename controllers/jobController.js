import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

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
    return next(new ErrorHandler("Please Provide the Job details Properly"));
  }

  if (!(salaryFrom || salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler("Please Provide either Fixed Salary or Range Salary")
    );
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      new ErrorHandler("Please Provider Either fixed Salary or Range Salary")
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
    status: true,
    message: "Job Posted Successfully !",
    job,
  });
});
