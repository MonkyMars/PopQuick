import express, { type Express } from "express";
import { createGroup, getAllGroups, joinGroup, deleteGroup, leaveGroup, uploadGroupPic, updateGroupDetail, searchGroupByName } from "@/src/Controllers/groupController";
import { authMiddleware } from "@/src/Middlewares/authMiddleware";
import uploadPicture from "@/src/configs/multerConfig";

const router = express.Router();

router.get('/', authMiddleware, getAllGroups);
// Get group by its name
router.get('/search', authMiddleware, searchGroupByName);
// Create group route
router.post('/', authMiddleware, createGroup);
// join group route
router.post('/:group_id/join', authMiddleware, joinGroup);
// leave group route
router.post('/:group_id/leave', authMiddleware, leaveGroup);
// Upload group profile pic route
router.patch('/:group_id/upload', authMiddleware, uploadPicture.single('image'), uploadGroupPic);
// Update group detail
router.patch('/:group_id/update', authMiddleware, updateGroupDetail);
// Delete group
router.delete('/:group_id', authMiddleware, deleteGroup);

export default router;