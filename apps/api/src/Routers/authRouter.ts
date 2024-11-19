import express, { type Express } from "express";
import { registerUser, loginUser } from "@/src/Controllers/authUserController"

const router = express.Router();

//Register routes
router.post('/signup', registerUser);

//Login routes
router.post('/login', loginUser);

export default router;