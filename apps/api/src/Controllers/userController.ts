import userModel, { IUser } from "../Models/userModel";
import { Request, Response } from "express";

//Get user information
export const getUserInfo = async (req: Request, res: Response) => {
    const userId = req.body.user_id;
    try {
        const user = await userModel.findOne({ user_id: userId }).select("-password") as IUser | null;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user information" });
    }
}

// Update user information
export const updateUser = async (req: Request, res: Response) => {
    const userId = req.body.user_id;
    const { username, email } = req.body;
    try {
        await userModel.findOneAndUpdate({user_id: userId }, { username, email }) as IUser | null;
        res.json({ message: "User information updated successfully" });
    } catch (error) {
        return res.status(404).json({ message: "User information updated" });
    }
}

//Delete user account information
export const deleteUserAccount = async (req: Request, res: Response) => {
    const userId = req.body.user_id;
    try {
        await userModel.findOneAndDelete({ user_id: userId });
        res.json({ message: "User account deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting user account" });
    }
}