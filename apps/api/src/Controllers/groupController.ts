import groupModel, { IGroup } from "@/src/Models/groupModel";
import userModel, { IUser } from "@/src/Models/userModel";
import { Request, Response } from "express";
import { z } from "zod";

// Get group information
const createGroupDefaultSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(10).max(500),
    member_limit: z.number().default(10),
});

const createGroupForSubscriptionUserSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(10).max(500),
    member_limit: z.number().max(100).default(10),
})

// Create a new group
export const createGroup = async (req: Request, res: Response) => {
    try {
        const validatedData = createGroupDefaultSchema.parse(req.body);
        const { name, description, member_limit } = validatedData;
        const user_id = req.user?.user_id;
        const subscriptionUser = req.user?.subscription;
        const existGroup = await groupModel.findOne({ name: name });
        if (existGroup) {
            return res.status(400).json({ message: 'Group already exists'});
        }
        if (subscriptionUser) {
            const validatedData = createGroupForSubscriptionUserSchema.parse(req.body);
            const { name, description, member_limit } = validatedData;
            // Create a group without limit for members
            const group = await groupModel.create({ name, description, member_limit, owner_id: user_id });
            res.status(201).json({ message: "Group created successfully", group: group });
        }

        if (!subscriptionUser) {
            // Create a group with just 10 members
            const group = await groupModel.create({ name, description, member_limit, owner_id: user_id });
            res.status(201).json({ message: "Group created successfully", group: group });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: (error as Error).message });
    }
};

// Get all groups
export const getAllGroups = async (req: Request, res: Response) => {
    try {
        const groups = await groupModel.find();
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: (error as Error).message});
    }
};

// Let the user join a group
export const joinGroup = async (req: Request, res: Response) => {
    try {
        const { group_id } = req.params;
        const user_id = req.user?.user_id;
        
        // Find the group via group_id
        const group = await groupModel.findOne({ group_id: group_id });
        // Find user via user_id
        const user = await userModel.findOne({ user_id: user_id }) as IUser | null;

        if (!group) {
            return res.status(404).json({ message: 'Group not found'});
        }

        // Check if the user is already a member
        if (group?.members.some((member) => member.user.user_id === user_id)) {
            return res.status(400).json({ message: 'You are already a member' });
        }

        // Check if group has reached its member limit
        if (group?.members.length >= group?.member_limit) {
            return res.status(400).json({ message: 'Group has reached its member limit' });
        }

        // Add the user to group
        group?.members.push({
            user: {
                user_id: <string>user?.user_id,
                username: <string>user?.username,
                email: <string>user?.email,
                profile_picture: <string>user?.profile_picture,
            }
        });
        await group.save();
        return res.status(200).json({ message: 'Successfully joined the group', group: group});
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: (error as Error).message });
    }
};

// Let the user leave a group
export const leaveGroup = async (req: Request, res: Response) => {
    try {
        const { group_id } = req.params;
        const user_id = req.user?.user_id;

        // Find the group via group_id
        const group = await groupModel.findOne({ group_id: group_id });

        // Check if the user is a member of the group
        if (!group || !group?.members.some((member) => member.user.user_id === user_id)) {
            return res.status(404).json({ message: 'You are not a member of this group'});
        }

        // Remove the user from the group
        group.members = group?.members.filter((member) => member.user.user_id !== user_id);
        await group.save();
        return res.status(200).json({ message: 'Successfully left the group', group: group});
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: (error as Error).message});
    }
}

// Delete a group
export const deleteGroup = async (req: Request, res: Response) => {
    try {
        const user_id = req.user?.user_id;
        const group_owner = await groupModel.findOne({ owner_id: user_id});
        const { group_id } = req.params;
        if (!group_owner) {
            return res.status(403).json({ message: 'Your are not the owner of the group' });
        }
        await groupModel.deleteOne({ group_id: group_id});
        res.status(200).json({ message: "Group deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: (error as Error).message });
    }
}