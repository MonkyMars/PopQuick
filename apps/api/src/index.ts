import { createServer } from "./server";
import { log } from "@repo/logger";
import dotenv from "dotenv";
import connectDB from "@/src/database";
dotenv.config();

const port = process.env.API_PORT;
const server = createServer();

// Connect to MongoDB
connectDB(process.env.MONGO_URI!); // Ensure MONGO_URI is defined
server.listen(port, () => {
  log(`Server running on port ${port}`);
});
