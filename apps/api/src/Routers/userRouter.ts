import express, { type Express } from "express";
import { deleteUserAccount, getUserInfo, updateUser, searchUserByUsername, uploadProfilePicture } from "@/src/Controllers/userController";
import { authMiddleware, isAdminMiddleware } from "@/src/Middlewares/authMiddleware";
import uploadPicture from "../configs/multerConfig";

const router = express.Router();

//User Profile routes
router.get('/profile',authMiddleware, getUserInfo);

// Search user routes
router.get('/search',authMiddleware, searchUserByUsername)

// Update user profile routes
router.patch('/profile', authMiddleware, updateUser);

// Update user profile picture routes
router.patch('/profile/upload', authMiddleware, uploadPicture.single('image'), uploadProfilePicture);

// Delete user profile routes
router.delete('/profile/:_id', authMiddleware, deleteUserAccount);

export default router;