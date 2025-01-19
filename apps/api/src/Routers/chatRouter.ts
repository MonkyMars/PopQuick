import express, { type Express } from "express";
import { authMiddleware } from "@/src/Middlewares/authMiddleware";
import { sendMessage, getMessages, editMessage, deleteMessage } from "@/src/Controllers/chatController";

const router = express.Router();

// Get messages
router.get("/:group_id/messages", authMiddleware, getMessages);

// Send a message
router.post('/:group_id/send', authMiddleware, sendMessage);

// Edit the message
router.patch('/:group_id/messages/:message_id', authMiddleware, editMessage);

// Delete the message
router.delete('/:group_id/messages/:message_id', authMiddleware, deleteMessage);

export default router;