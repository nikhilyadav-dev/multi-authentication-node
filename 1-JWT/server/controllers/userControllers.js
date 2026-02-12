import User from "../models/userModel.js";
import ErrorHandler from "../middleware/error.js";
import { wrapAsync } from "../middleware/wrapAsync.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";

import twilio from "twilio";

export const register = wrapAsync(async (req, res, next) => {
  try {
    const { name, email, phone, password, verificationMethod } = req.body;

    if (!name || !email || !phone || !password || !verificationMethod) {
      return next(new ErrorHandler("All field are required", 400));
    }

    function validPhoneNumber(phone) {
      const phoneRegex = /^(\+91|91)?\d{10}$/;
      return phoneRegex.test(phone);
    }

    if (!validPhoneNumber(phone)) {
      return next(new ErrorHandler("Invalid phone number", 400));
    }

    const existingUser = await User.findOne({
      $or: [
        {
          email,
          accountVerified: true,
        },
        {
          phone,
          accountVerified: true,
        },
      ],
    });

    if (existingUser) {
      return next(new ErrorHandler("Phone or Email is already used.", 400));
    }

    const registrationAttempByUser = await User.find({
      $or: [
        { phone, accountVerified: false },
        { email, accountVerified: false },
      ],
    });

    console.log(registrationAttempByUser);

    if (registrationAttempByUser.length > 3) {
      return next(
        new ErrorHandler(
          "You have exceeded the maximum number of attempts (3). Please try again after an hour.",
          400
        )
      );
    }

    const user = new User({
      name,
      email,
      password,
      phone,
    });

    const verificationCode = await user.generateVerificationCode();
    await user.save();

    sendVerificationCode(
      verificationMethod,
      verificationCode,
      name,
      email,
      phone,
      res
    );
  } catch (error) {
    next(error);
  }

  async function sendVerificationCode(
    verificationMethod,
    verificationCode,
    name,
    email,
    phone,
    res
  ) {
    try {
      if (verificationMethod === "email") {
        const message = generateEmailTemplate(verificationCode);
        sendEmail({ email, subject: "Your Verification Code", message });
        res.status(200).send({
          success: true,
          message: `Verification email successfully sent to ${name}`,
        });
      } else if (verificationMethod === "phone") {
        const client = twilio(
          process.env.TWILIO_SID,
          process.env.TWILIO_AUTH_TOKEN
        );
        const verificationCodeWithSpace = verificationCode
          .toString()
          .split("")
          .join(" ");
        await client.calls.create({
          twiml: `<Response><Say>Your verification code is ${verificationCodeWithSpace}. Your verification code is ${verificationCodeWithSpace}.</Say></Response>`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phone,
        });

        res.status(200).json({
          success: true,
          message: `OTP sent.`,
        });
      } else {
        res.status(400).json({
          success: false,
          message: `Invalid verification method`,
        });
      }
    } catch (error) {
      return next(new ErrorHandler("Verification code failed to send", 500));
    }
  }

  function generateEmailTemplate(verificationCode) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #4CAF50; text-align: center;">Verification Code</h2>
      <p style="font-size: 16px; color: #333;">Dear User,</p>
      <p style="font-size: 16px; color: #333;">Your verification code is:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px 20px; border: 1px solid #4CAF50; border-radius: 5px; background-color: #e8f5e9;">
          ${verificationCode}
        </span>
      </div>
      <p style="font-size: 16px; color: #333;">Please use this code to verify your email address. The code will expire in 10 minutes.</p>
      <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
      <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
        <p>Thank you,<br>Your Company Team</p>
        <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
      </footer>
    </div>
  `;
  }
});

export const verifyOTP = wrapAsync(async function (req, res, next) {
  const { email, phone, otp } = req.body;

  function validPhoneNumber(phone) {
    const phoneRegex = /^(\+91|91)?\d{10}$/;
    return phoneRegex.test(phone);
  }

  if (!validPhoneNumber(phone)) {
    return next(new ErrorHandler("Invalid phone number", 400));
  }

  try {
    const userAllEntries = await User.find({
      $or: [
        { email, accountVerified: false },
        { phone, accountVerified: false },
      ],
    }).sort({ createdAt: -1 });

    if (!userAllEntries) {
      return next(new ErrorHandler("User not found", 404));
    }

    let user;
    if (userAllEntries.length > 1) {
      user = userAllEntries[0];

      await User.deleteMany({
        _id: { $ne: user._id },
        $or: [
          { phone, accountVerified: false },
          { email, accountVerified: false },
        ],
      });
    } else {
      user = userAllEntries[0];
    }

    console.log(user);
    console.log(otp);
    if (user.verificationCode != Number(otp)) {
      console.log("OTP verification working");
      return next(new ErrorHandler("Invalid OTP", 400));
    }

    const currentTime = Date.now();

    const verificationCodeExpire = new Date(
      user.verificationCodeExpire
    ).getTime();
    if (currentTime > verificationCodeExpire) {
      return next(new ErrorHandler("OTP Expired.", 400));
    }

    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpire = null;
    await user.save({ validateModifiedOnly: true });

    console.log("Send token request sended");
    sendToken(user, 200, "Account Verified.", res);
  } catch (error) {
    return next(new ErrorHandler("Internal server error", 500));
  }
});

export const login = wrapAsync(async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Email and Password are required", 400));
  }

  const user = await User.findOne({ email, accountVerified: true }).select(
    "+password"
  );

  if (!user) {
    return next(new ErrorHandler("Invalid Email and Password", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email and Password", 400));
  }
  sendToken(user, 200, "User logged in successfully.", res);
});

export const logout = wrapAsync(async function (req, res, next) {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully.",
    });
});

export const getUser = wrapAsync(async function (req, res, next) {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const forgotPassword = wrapAsync(async function (req, res, next) {
  const { email } = req.body;
  const user = await User.findOne({ email, accountVerified: true });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const resetToken = await user.generateResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const message = `Your Reset Password Token is:- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it.`;

  try {
    sendEmail({
      email: user.email,
      subject: "Reset Password",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resestPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new ErrorHandler(
        error.message ? error.message : "Can't send reset password",
        500
      )
    );
  }
});

export const resetPassword = wrapAsync(async function (req, res, next) {
  console.log("Request Working");
  const { resetToken } = req.params;
  const { password, confirmPassword } = req.body;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log("resetPasswordToken", resetPasswordToken);

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: new Date(Date.now()) },
  });

  console.log(user);

  if (!user) {
    return next(
      new ErrorHandler("Reset password token is invalid or has been expired")
    );
  }

  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and Confirm Password do't match", 400)
    );
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, "Reset password successfully", res);
});
