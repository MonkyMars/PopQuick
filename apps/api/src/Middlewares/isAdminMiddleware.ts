import { Request, Response, NextFunction } from 'express';
import userModel from '@/src/Models/userModel';

export const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.findOne({ user_id: req.body.user_id });
        // Check if user is admin
        if (user && user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: 'Unauthorized, you are not admin' });
        }
    } catch (err) {
        res.status(500).json({ 
            message: 'Server Error',
            error: (err as Error).message
        });
        next(err);
    }
}