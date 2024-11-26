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
    profile_picture?: string;
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
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profile_picture: {
        type: String,
        default: "https://i.pinimg.com/736x/99/d0/7f/99d07f72ea74f29fe21833964704cdc9.jpg"
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

userSchema.index({ username: 1 });

const userModel = model<IUser>('User', userSchema);
export default userModel;