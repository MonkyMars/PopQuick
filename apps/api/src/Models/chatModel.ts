import mongoose, { Schema, Document, model } from "mongoose";
import { v4 as uuid } from 'uuid';

interface IChat extends Document {
    messageID: string;
    groupName: string;
    username: string;
    message: string;
    timestamp: Date;
}

const ChatSchema: Schema = new Schema({
    messageID: { type: String, default: uuid, unique: true, },
    groupID: { type: String, required: true },
    username: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const chatModel = model<IChat>('Chat', ChatSchema);
export default chatModel;
