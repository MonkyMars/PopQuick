import { User } from "./models/userModel"; // Adjust the import path

declare global {
    namespace Express {
        interface User {
            user_id: string;
            isAdmin: boolean;
            email?: string; // Add other properties if needed
        }

        interface Request {
            user?: User; // Make user optional to handle cases where it's undefined
        }
    }
}
