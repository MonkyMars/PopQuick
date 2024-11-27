import userModel, { IUser } from "../Models/userModel";
import { Request, Response } from "express";

//Get user information
export const getUserInfo = async (req: Request, res: Response) => {
    const user_id = res.locals.user.user_id;
    try {
        const user = await userModel.findOne({ user_id: user_id }).select("-password") as IUser | null;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user information" });
    }
}

// Search for user by username
export const searchUserByUsername = async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10; //default to 10
    const skip = parseInt(req.query.skip as string) * limit || 0;
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(400).json({ message: 'Username query parameter is required'})
        }
        const user = await userModel.find({
            username: { $regex: username, $options: 'i' } // `i` makes the search case-insensitive
        }).select("-password").limit(limit).skip(skip);
        if (user.length === 0) {
            return res.status(404).json({ message: 'No users found'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while searching for users', error });
    }
}

// Update user information
export const updateUser = async (req: Request, res: Response) => {
    const userId = res.locals.user.user_id;
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
    const { _id } = req.params;
    const admin = res.locals.user.isAdmin;
    try {
        if (admin) {
            return res.status(500).json({ message: 'You cannot delete this user'});
        };
        await userModel.findByIdAndDelete(_id);
        res.json({ message: "User account deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting user account" });
    }
}