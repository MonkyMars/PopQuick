import { expressServer } from "./server";
import { log } from "@repo/logger";
import 'dotenv/config';
import connectDB from "@/src/database";
import { createServer } from 'http';
import { initSocket } from '@/src/socket';
import { getIO } from "@/src/socket";

const port = process.env.API_PORT;
const app = expressServer();
const server = createServer(app);
// Connect to MongoDB
connectDB(process.env.MONGO_URI!); // Ensure MONGO_URI is defined
// Initialize Socket.IO
initSocket(server);

const io = getIO();
app.set('io', io);
server.listen(port, () => {
  log(`Server running on port ${port}`);
});
