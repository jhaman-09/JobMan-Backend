import { response } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import cloudinary from "cloudinary";
import { Job } from "../models/jobSchema.js";

// Employee get all  his job posted application
export const employerGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler(
          "Job Seekers are not allowed to access this resource !",
          400
        )
      );
    }

    const id = req.user._id;

    const applications = await Application.find({
      "employerId.user": id,
    });

    if (!applications) {
      return next(new ErrorHandler("Oops, No One has applied yet", 404));
    }

    res.status(200).json({
      success: true,
      message: "Applications found successfully !",
      applications,
    });
  }
);

// Job seeker get all his applied job applications
export const JobSeekerGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employee") {
      return next(
        new ErrorHandler(
          "Employee is not allowed to access this resource !",
          400
        )
      );
    }

    const id = req.user._id;
    const applications = await Application.find({ "applicantId.user": id });

    if (!applications) {
      return next(
        new ErrorHandler("Your have not yet applied for any job", 404)
      );
    }

    res.status(200).json({
      success: true,
      message: "Applied Applications Found Successfully",
      applications,
    });
  }
);

// Job seeker delete his applied job application
export const jobSeekerDeleteJobApplication = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employee") {
      return next(
        new ErrorHandler("Employee Cannot able to access this resource !", 400)
      );
    }

    const id = req.params.id;
    const application = await Application.findById(id);

    if (!application) {
      return next(new ErrorHandler("Oops, Job Not Found", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted Successfully !",
    });
  }
);



export const applyForJobApplication = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employee") {
      return next(
        new ErrorHandler(
          "Employee are not allowed to access this resource !",
          404
        )
      );
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Resume File required !"));
    }

    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/webp", "image/jpg"];
    if (!allowedFormats.includes(resume.mimetype)) {
      return next(
        new ErrorHandler(
          "Invalid File type. Please upload your resume in PNG, JPG, or WEBP format.",
          400
        )
      );
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Clodinary Error !",
        cloudinaryResponse.error || "Unknown Cloudinary Error"
      );

      return next(new ErrorHandler("Failed to Upload resume.", 500));
    }

    const { name, email, coverLetter, phone, address, jobId } = req.body;

    const applicantId = {
      user: req.user._id,
      role: "Job Seeker",
    };

    if (!jobId) {
      return next(new ErrorHandler("Job Not Found !", 404));
    }

    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      return next(new ErrorHandler("Job Details Not Found !", 400));
    }

    const employerId = {
      user: jobDetails.postedBy,
      role: "Employee",
    };

    if (
      !name ||
      !email ||
      !coverLetter ||
      !employerId ||
      !applicantId ||
      !phone ||
      !resume ||
      !address
    ) {
      return next(new ErrorHandler("Please fill all the field Properly", 400));
    }

    const applicationForJob = await Application.create({
      name,
      email,
      coverLetter,
      employerId,
      applicantId,
      phone,
      address,
      resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    res.status(200).json({
      success: true,
      message: "Application Submitted Successfully !",
      applicationForJob,
    });
  }
);
