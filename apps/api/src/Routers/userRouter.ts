import express, { type Express } from "express";
import { deleteUserAccount, getUserInfo, updateUser } from "@/src/Controllers/userController";
import { authMiddleware } from "@/src/Middlewares/authMiddleware";
import { isAdminMiddleware } from "@/src/Middlewares/isAdminMiddleware";

const router = express.Router();

//User Profile routes
router.get('/profile',authMiddleware , getUserInfo);

// Update user profile routes
router.put('/profile', authMiddleware, updateUser);

// Delete user profile routes
router.delete('/profile', authMiddleware, isAdminMiddleware, deleteUserAccount);

export default router;