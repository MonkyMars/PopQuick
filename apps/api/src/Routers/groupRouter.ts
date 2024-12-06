import express, { type Express } from "express";
import { createGroup, getAllGroups, joinGroup, deleteGroup, leaveGroup } from "@/src/Controllers/groupController";
import { authMiddleware } from "@/src/Middlewares/authMiddleware";

const router = express.Router();

router.get('/', authMiddleware, getAllGroups);
// Create group route
router.post('/', authMiddleware, createGroup);
// join group route
router.post('/:group_id/join', authMiddleware, joinGroup);
// leave group route
router.post('/:group_id/leave', authMiddleware, leaveGroup);

router.delete('/:group_id', authMiddleware, deleteGroup);

export default router;