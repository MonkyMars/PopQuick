import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        const decoded = jwt.verify(token, <string>process.env.JWT_SECRET);
        (req as CustomRequest).token = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Please authenticate.' });
    }
}