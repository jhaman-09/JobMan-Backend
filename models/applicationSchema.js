import { application } from "express";
import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Applicant name must have at least 3 charators"],
    maxLength: [30, "Applicant name cannot have more than 30 charactors"],
  },
  email: {
    type: String,
    required: true,
    validator: [validator.isEmail, "Please Provide a valid email"],
  },
  coverLetter: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: [true, "Please Provide your Phone Number"],
  },
  address: {
    type: String,
    required: [true, "Please Provide your address !"],
    minLength: [10, "Address must have 30 charactors"],
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  applicantId: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"],
      required: true,
    },
  },
  employerId: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employee"],
      required: true,
    },
  },
});

export const Application = mongoose.model("Application", applicationSchema);
