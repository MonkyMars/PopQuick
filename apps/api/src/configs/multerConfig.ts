import multer from "multer";
import cloudinary from "./cloudinaryConfig";
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile_picture',
        allowed_format: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 500, height: 500, crop: 'fill' }], // Resize image to 500x500 pixels and fill the remaining area with white
    }
});

const uploadPicture = multer({ storage });

export default uploadPicture;