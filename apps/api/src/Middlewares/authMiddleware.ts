import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface JwtPayload {
    user_id: string;
    isAdmin: boolean;
    subscription: boolean;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.x_auth_cookie;

        if (!token) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        const decoded = jwt.verify(token, <string>process.env.JWT_SECRET) as JwtPayload;
        req.user = {
            user_id: decoded.user_id,
            isAdmin: decoded.isAdmin,
            subscription: decoded.subscription,
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Please authenticate.', error: ( error as Error ).message });
    }
};

export const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        if (!req.user?.isAdmin) {
            return res.status(403).json({ message: 'Access denied, you are not admin' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Please authenticate.' });
    }
}