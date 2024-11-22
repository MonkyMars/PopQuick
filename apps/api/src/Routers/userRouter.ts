import express, { type Express } from "express";
import { getUserInfo } from "../Controllers/userController";
import { authMiddleware } from "../Middlewares/authMiddleware";

const router = express.Router();

//User Profile routes
router.get('/profile/:_id',authMiddleware , getUserInfo)

export default router;