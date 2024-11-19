import mongoose from 'mongoose';

/**
 * Connect to MongoDB database.
 * @param uri - MongoDB connection string.
 */
const connectDB = async (MONGO_URI: string): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;
