import userModel, { IUser } from '@/src/Models/userModel'; 
import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from 'zod';
import 'dotenv/config';

const JWT_SECRET = <string>process.env.JWT_SECRET;

interface AuthRequestBody {
    username?: string;
    email: string;
    password: string;
}

// Define the schema for login request validation
const loginSchema = z.object({
    identifier: z.string().min(3, "Email or username is request"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

// Define the schema for register request validation
const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

//Crate a token
const createToken = (user_id: string, isAdmin: boolean, subscription: boolean) => {
    // Define the payload
    const payloads = {
        user_id,
        isAdmin,
        subscription,
    }
    // Generate the token
    const token = jwt.sign(payloads, JWT_SECRET, { expiresIn: '24h' });
    return token;
}
//Resister user functionality
export const registerUser = async (req: Request<{}, {}, AuthRequestBody>, res: Response, next: NextFunction) => {
    const validatedData = registerSchema.parse(req.body);
    // Destructure validated fields
    const { username, email, password } = validatedData;
    try {
        const existingUser = await userModel.findOne({ email }) as IUser | null;
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const user = new userModel({ username, email, password });
    await user.save();

    // Create token
    const token = createToken(user.user_id.toString(), user.isAdmin, user.subscription);

    res.cookie('x_auth_cookie', token, {
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict", // Protect against CSRF attacks
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ 
            message: 'Server Error',
            error: (error as Error).message
        });
        next(error);
    }
}

// Login user functionality
export const loginUser = async (req: Request<{}, {}, AuthRequestBody>, res: Response, next: NextFunction) => {
    try {
        const validatedData = loginSchema.parse(req.body);
        // Destructure validated fields
        const { identifier, password } = validatedData;
        // Check if identifier is an email or username
        const isEmail = /\S+@\S+\.\S+/.test(identifier);
        // Fetch user
        const user = isEmail ? await userModel.findOne({ email: identifier}) as IUser | null : await userModel.findOne({ username: identifier }) as IUser | null
        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        };
        // Compare the passwords
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Create a token
        const token = createToken(user.user_id.toString(), user.isAdmin, user.subscription);
        
        // Send response
        res.cookie('x_auth_cookie', token, {
            httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict", // Protect against CSRF attacks
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        res.status(200).json({ message: 'Login successful'});
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: (error as Error).message,
        });
        next(error);
    }
};

export const googleCallBack = async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, isAdmin, subscription } = req.user as Express.User;
    console.log()
    // Create token
    const token = createToken(user_id.toString(), isAdmin, subscription );
    // Successfully authenticated
    res.cookie('x_auth_cookie', token, {
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict", // Protect against CSRF attacks
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(200).json({ message: 'Login successfully', user: req.user});
};

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err)  {
            next(err);
            res.redirect('/');
        }
    })
}
