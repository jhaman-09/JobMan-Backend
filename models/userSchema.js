import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide your name"],
    minLength: [3, "Name must contain at least 3 characters"],
    maxLength: [30, "Name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Provide your Email"],
    validate: [validator.isEmail, "Please Provide a valid email"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide your Phone Number."],
  },
  password: {
    type: String,
    required: [true, "Please Provide Your password"],
    minLength: [8, "Password must contain at least 8 characters"],
    maxLength: [30, "Password cannot exceed 30 charaters"],
  },
  role: {
    type: String,
    required: [true, "Please provide your role"],
    enum: ["Job Seeker", "Employee"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// hashed password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare pre store hashed password and enter password
userSchema.methods.comparePassword = async (enteredPassword) => {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generating a JWT TOKEN for authorization
userSchema.methods.getJWTToken = () => {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
