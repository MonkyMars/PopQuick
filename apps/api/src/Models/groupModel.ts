import mongoose, { Schema, Document, model } from 'mongoose';
import { v4 } from 'uuid';

// Define the group interface
export interface IGroup extends Document {
    group_id: string; // uuid for group
    name: string;
    description: string;
    event_date: Date;
    member_limit: number; // default 10
    members: { 
        user: {
            username: string;
            email: string;
            profile_picture: string;
            user_id: string; // uuid for user
    } }[]; // array of user_ids
    owner_id: string; // uuid for user_id
    group_profile: string;
}

// Define the user schema 
const groupSchema: Schema<IGroup> = new Schema({
    group_id: {
        type: String,
        default: v4,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    event_date: {
        type: Date,
    },
    member_limit: {
        type: Number,
        default: 10,
    },
    members: [
        {
            user: {
                user_id: { type: String, required: true },
                username: { type: String, required: true },
                email: { type: String, required: true },
                profile_picture: { type: String, required: true },
            },
            _id: false // we don't need this 
        }
    ], // array of user_ids
    owner_id: {
        type: String,
    }, // uuid for user_id
    group_profile: {
        type: String,
    }
})

groupSchema.index({ name: 1 });

const groupModel = model<IGroup>('Group', groupSchema);
export default groupModel;