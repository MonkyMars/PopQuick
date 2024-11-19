import mongoose, { Schema, Document, model } from 'mongoose';
import { v4 } from 'uuid';
import bcrypt from "bcrypt";

// Define the User interface
export interface IUser extends Document {
    user_id: string; // uuid for user
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

// Define the User schema
const userSchema: Schema<IUser> = new Schema({
    user_id: {
        type: String,
        default: v4,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Static login method
userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({ email })
    if(!user) {
        throw Error('Incorrect email')
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        throw Error('Incorrect password')
    }
    return user
}

const userModel = model<IUser>('User', userSchema);
export default userModel;