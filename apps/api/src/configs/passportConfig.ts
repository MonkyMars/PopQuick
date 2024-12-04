import passport from 'passport';
import { Profile, VerifyCallback } from 'passport-google-oauth20';
const googleStrategy = require('passport-google-oauth20').Strategy;
import userModel, { IUser } from '@/src/Models/userModel';

passport.use(
    new googleStrategy (
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: '/api/auth/google/callback',
        },
        async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            // Find or create user
            let user = await userModel.findOne({ user_id: profile.id });
            
            if (!user) {
                user = await userModel.create({
                    user_id: profile.id,
                    username: profile.displayName,
                    email: profile.emails?.[0]?.value,
                    profile_picture: profile.photos?.[0]?.value
                });
                await user.save();
            }
            // Pass the user to done
            done(null, user);
        }
    )
);

// Serialize user (save user info in session)
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

  // Deserialize user (retrieve user from session)
passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findOne({ user_id: id});
        if (user) {
            done(null, {
                user_id: user.id,
                isAdmin: user.isAdmin,
                email: user.email
            })
        } else {
            done(null, null)
        }
    } catch (error) {
        done(error, null)
    }
});