import userModel, { IUser } from "../Models/userModel";
import { Request, Response } from "express";

//Get user information
export const getUserInfo = async (req: Request, res: Response) => {
    const { _id } = req.params;
    try {
        const user = await userModel.findById(_id).select("-password") as IUser | null;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user information" });
    }
}