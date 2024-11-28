import express, { type Express } from "express";
import { registerUser, loginUser, logoutUser, googleCallBack } from "@/src/Controllers/authUserController"
import passport from "passport";

const router = express.Router();

//Register routes
router.post('/signup', registerUser);

//Login routes
router.post('/login', loginUser);

// Google OAuth 2.0 routes
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// Handle Google Callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), googleCallBack);

// Logout routes
router.get('/logout', logoutUser)
export default router;