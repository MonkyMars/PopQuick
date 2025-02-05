import chatModel from '@/src/Models/chatModel';
import userModel, { IUser } from '@/src/Models/userModel';
import { Request, Response } from 'express';
import groupModel from '@/src/Models/groupModel';
import { getIO } from '@/src/socket';

// get the messages
export const getMessages = async ( req: Request, res: Response ) => {
    try {
        const { group_id } = req.params;
        const user_id = req.user?.user_id
        const user = await userModel.findOne({ user_id: user_id });
        const username = user?.username;
        const group = await groupModel.findOne({ group_id: group_id});
        const groupMember = group?.members.some((member) => member.user.username === username);
        if (!group_id) {
            return res.status(400).json({ message: 'group id required'});
        }

        if (groupMember) {
            // fetch messages from the db
            const messages = await chatModel.find({ groupID: group_id });

            return res.status(200).json({
                success: true,
                data: messages
            })
        } else {
            return res.status(401).json({ message: 'You are not a member of this group'});
        }
    } catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({ error: "Server Error" });
    }
}

// create a send message
export const sendMessage = async (req: Request, res: Response) => {
    const user_id = req.user?.user_id
    const user = (await userModel.findOne({ user_id: user_id })) as IUser | null
    const username = user?.username
    const { group_id } = req.params
    const group = await groupModel.findOne({ group_id: group_id })
    const groupMember = group?.members.some((member) => member.user.username === username)
    const { message } = req.body
    try {
      if (groupMember && group) {
        const newMessage = new chatModel({ groupID: group_id, username, message })
        await newMessage.save()
  
        const io = getIO()
        io.to(group_id).emit("newMessage", newMessage)
  
        // this will check if there is 2 people in the group so it can start the timer.
        if (group.members.length === 2) {
          // starts the time for the deletion
          startDeletionTimer(group_id)
        }
  
        res.status(200).json({ success: true, data: newMessage })
      } else {
        return res.status(403).json({ message: "You are not in the group" })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, error: "Server Error" })
    }
  }
  
  // 15 minutes to delete the messages
  export const startDeletionByTimer = (group_id: string) => {
    const FIFTEEN_MINUTES = 15 * 60 * 1000 // 15 minutes (basically)
  
    setTimeout(async () => {
      try {
        // delete all messages from the gc (which there is 2 people in the group)
        await chatModel.deleteMany({ groupID: group_id })
          const io = getIO()
        io.to(group_id).emit("redirectToHome", { message: "Chat session ended. Redirecting to home." })
      } catch (error) {
        console.error("Error in deletion timer:", error)
      }
    }, FIFTEEN_MINUTES)
  }
// Edit the message via messageId
export const editMessage = async (req: Request, res: Response) => {
    const { message_id, group_id } = req.params;
    const user_id = req.user?.user_id;
    const user = await userModel.findOne({ user_id: user_id }) as IUser | null;
    const username = user?.username;
    const group = await groupModel.findOne({ group_id: group_id });
    const groupMember = group?.members.some((member) => member.user.username === username);
    try {
        if (groupMember) {
            // Update the message in the DB
            const updatedMessage = await chatModel.updateOne({ messageID: message_id, username: username }, { $set: { message: req.body.message } });
            const io = getIO();
            io.to(group_id).emit("editedMessage", updatedMessage);
            res.status(200).json({ success: true, data: updatedMessage });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: (error as Error).message });
    }
};

// Delete the message via messageID
export const deleteMessage = async (req: Request, res: Response) => {
    const { message_id, group_id } = req.params;
    const user_id = req.user?.user_id;
    const user = await userModel.findOne({ user_id: user_id }) as IUser | null;
    const username = user?.username;
    const group = await groupModel.findOne({ group_id: group_id });
    const groupMember = group?.members.some((member) => member.user.username === username);
    try {
        // Delete the message from the DB
        const deleteMessage = await chatModel.deleteOne({ messageID: message_id, username: username });
        const io = getIO();
        io.to(group_id).emit("deletedMessage", deleteMessage);
        res.status(200).json({ success: true, data: deleteMessage })
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: (error as Error).message });
    }
}

