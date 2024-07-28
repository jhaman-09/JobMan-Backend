import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Peovide job title"],
    minLength: [3, "Job Title must contain at least 3 charactor"],
    maxLength: [50, "Job Title cannot exceed 50 charators"],
  },
  description: {
    type: String,
    required: [true, "Plear Provide the Job Description"],
    minLength: [3, "Job description must contain at least 3 charators"],
    maxLength: [500, "Job Description cannot have more than 500 Charatprs"],
  },
  category: {
    type: String,
    required: [true, "Job Category must required"],
  },
  city: {
    type: String,
    required: [true, "Please Provide the Job City"],
    minLength: [5, "Job City Must cantain at least 5 charactors"],
  },
  location: {
    type: String,
    required: [true, "Please Provide the Exact Job location"],
    minLength: [20, "Job Location Must cantain at least 20 charactors"],
  },
  country: {
    type: String,
    required: [true, "Please Provide the job country name"],
    minLength : [3, "Job Country name at least has 3 charator"]
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "Fixed Salary has at least 4 digit figure"],
    maxLength: [9, "Fixed salary cannot in more than 9 digit figure"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "Salary From must contain at least 4 digit figure"],
    maxLength: [9, "Salary From cannot exceed 9 digit Figure"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, " Salary To Must contain at least 4 digit figure"],
    maxLength: [9, "Salary to cannot exceed 9 digit figure"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
