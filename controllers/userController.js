import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;
  if (!name || !email || !phone || !role || !password) {
    return next(
      new ErrorHandler("Please fill full registration form Properly", 400)
    );
  }

  const isEmail = await User.findOne({ email });

  if (isEmail) return next(new ErrorHandler("Email Already Existed"));

  const user = await User.create({
    name,
    password,
    email,
    phone,
    role,
  });

  // res.status(200).json({
  //   success: true,
  //   message: "User Registered Successfully",
  //   user,
  // });

  sendToken(user, 200, res, "User Registered Successfully!");
});



export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(
      new ErrorHandler(
        "Please Provide the email, password and role proerly.",
        400
      )
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }

  if (user.role !== role) {
    return next(new ErrorHandler("User with this role not found!", 400));
  }

  sendToken(user, 200, res, "User Login Successfully !");
});


export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User Logout Successfully !",
    });
});



// Profile of Login User
export const getUser = catchAsyncError(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new ErrorHandler("Login User Not Found !", 404));
  }

  return res.status(200).json({
    message: "Found User Profile Details Successfully !",
    user,
    success: true
  })
})