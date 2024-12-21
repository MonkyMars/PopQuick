import { Server as HTTPServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import groupModel from '@/src/Models/groupModel';
import { log } from '@repo/logger'; 

let io: SocketServer;

export const initSocket = (httpServer: HTTPServer) => {
    io = new SocketServer(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on("connection", (socket) => {
        log(`A user connected: ${socket.id}`);

        // Join a group
        socket.on("joinGroup", async ({ groupID, username }) => {
            const group = await groupModel.findOne({ groupID });
            
            if (group && group?.members.some((member) => member.user.username === username)) {
                socket.join(groupID);
                socket.emit("joinGroup", { success: true, groupID });
                log(`${username} joined group: ${groupID}`);
            } else {
                socket.emit("joinedGroup", { success: false, message: "Access denied" });
            }
        });

        // Listen for new messages
        socket.on("sendMessage", (data) => {
            socket.broadcast.emit("newMessage", data); // Broadcast to all clients
        });

        // Listen for edit messages
        socket.on("editMessage", (data) => {
            socket.broadcast.emit("editedMessage", data);
        });

        // Listen for delete messages
        socket.on("deleteMessage", (data) => {
            socket.broadcast.emit("deletedMessage", data); // Broadcast to all clients
        })

        socket.on("disconnect", () => {
            log(`A user disconnected: ${socket.id}`);
        });
    });
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io has not been initialized");
    }
    return io
}