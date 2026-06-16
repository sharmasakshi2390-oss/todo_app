import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import { 
    registerUser,
    getAllUsers,
    loginUser,
    getProfile
 } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/users", getAllUsers);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);

export default router;