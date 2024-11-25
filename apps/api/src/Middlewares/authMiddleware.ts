import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import userModel from '@/src/Models/userModel';

interface JwtPayload {
    user_id: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        const decoded = jwt.verify(token, <string>process.env.JWT_SECRET) as JwtPayload;
        req.body.user_id = decoded.user_id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Please authenticate.' });
    }
};

export const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = await userModel.findOne({ user_id: req.body.user_id });
        if (user && user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: 'Access denied, you are not admin' });
        }
}
