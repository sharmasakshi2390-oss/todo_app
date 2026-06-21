import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { 
    createUser, 
    getUsers,
    findUserByEmail,
    getUserById,
    updateUserProfile,
    changePassword
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
  console.log*("Existing User:" , existingUser);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    fullname,
    email,
    password: hashedPassword,
  });

  res.status(201).json(user);
};

export const getAllUsers = async (req, res) => {
    const users = await getUsers();
    res.json(users);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

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
    message: "Login successful",
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