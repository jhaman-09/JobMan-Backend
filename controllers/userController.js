import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";

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

  res.status(200).json({
    success: true,
    message: "User Registered Successfully",
    user,
  });
});
