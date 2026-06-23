import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import transporter from "../config/mail.js"
import { 
    createUser, 
    getUsers,
    findUserByEmail,
    getUserById,
    updateUserProfile,
    changePassword,
    verifyUserEmail,
    saveResetToken,
    resetUserPassword
 } from "../services/userService.js";

export const registerUser = async (req, res) => {
  console.log("BODY:", req.body);

  const { fullname, email, password } = req.body;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }

  console.log("Existing User:", existingUser);

  const hashedPassword = await bcrypt.hash(password, 10);

  const verifyToken =
    crypto.randomBytes(32).toString("hex");

  await createUser({
    fullname,
    email,
    password: hashedPassword,
    verifyToken,
  });

  // await transporter.sendMail({
  //   from: process.env.EMAIL_USER,
  //   to: email,
  //   subject: "Verify Your Email",
  //   html: `
  //     <h2>Email Verification</h2>

  //     <p>Click below link:</p>

  //     <a href="http://localhost:5000/api/users/verify-email/${verifyToken}">
  //       Verify Email
  //     </a>
  //   `,
  // });

  res.status(201).json({
    message:
      "Registration successful. Please verify your email.",
  });
};

export const verifyEmail = async (req, res) => {
  try {
  const { token } = req.params;

  await verifyUserEmail(token);

  res.send("Email verified successfully ✅");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
   
export const getAllUsers = async (req, res) => {
    const users = await getUsers();
    res.json(users);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  console.log("login user : ",user)

  // if (!user.isVerified) {
  //   return res.status(401).json({
  //     message: "Please verify your email first",
  //   });
  // }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    { id: user.id },
    "secretkey",
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login Successful",
    token,
  });
};

export const getProfile = async (req, res) => {
  const user = await getUserById(req.user.id);

  res.json(user);
};

export const updateProfile = async (req, res) => {
  try{
    const { fullname, email } = req.body;

    const user = await updateUserProfile(
      req.user.id,
      fullname,
      email
    );

    res.json(user);
  } catch (error) {
  if (error.code === "P2002") {
    return res.status(400).json({
      message: "Email already exists",
    });
  }

  res.status(500).json({
    message: error.message,
  });
}}

export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    await changePassword(
      req.user.id,
      currentPassword,
      newPassword
    );

    res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const resetToken =
    crypto.randomBytes(32).toString("hex");

  await saveResetToken(
    email,
    resetToken
  );

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Password",
    html: `
      <h2>Reset Password</h2>

      <a href="http://localhost:3000/reset-password/${resetToken}">
        Reset Password
      </a>
    `,
  });

  res.json({
    message: "Reset email sent",
  });
};

export const resetPassword = async (
  req,
  res
) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    await resetUserPassword(
      token,
      newPassword
    );

    res.json({
      message:
        "Password reset successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};