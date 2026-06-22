import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import { 
    registerUser,
    getAllUsers,
    loginUser,
    getProfile,
    updateProfile,
    updatePassword,
    verifyEmail,
    forgotPassword,
    resetPassword
 } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/users", getAllUsers);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.patch("/profile", authMiddleware, updateProfile);
router.patch("/change-password", authMiddleware, updatePassword);
router.get("/verify-email/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
export default router;