import express, { type Express } from "express";
import { deleteUserAccount, getUserInfo, updateUser } from "@/src/Controllers/userController";
import { authMiddleware, isAdminMiddleware } from "@/src/Middlewares/authMiddleware";

const router = express.Router();

//User Profile routes
router.get('/profile',authMiddleware , getUserInfo);

// Update user profile routes
router.patch('/profile', authMiddleware, updateUser);

// Delete user profile routes
router.delete('/profile', authMiddleware, isAdminMiddleware, deleteUserAccount);

export default router;