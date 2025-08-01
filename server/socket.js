import dotenv from "dotenv";
dotenv.config();

import { Server as SocketIOServer } from "socket.io";

const userSocketMap = new Map();

export const getUserSocketMap = () => userSocketMap;

const setupSocket = (server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: process.env.ORIGIN || "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;
        if (userId) {
            userSocketMap.set(userId, socket.id);
        } else {
            console.log("User ID not provided in socket handshake.");
        }

        socket.on("send-message", ({ senderId, receiverId, text }) => {
            const receiverSocketId = userSocketMap.get(receiverId);

            if (receiverSocketId) {
                io.to(receiverSocketId).emit("receive-message", {
                    senderId,
                    text,
                });
                console.log(`Message from ${senderId} to ${receiverId}: ${text}`);
            } else {
                console.log(`Receiver ${receiverId} is offline.`);
            }
        });

        socket.on("disconnect", () => {
            console.log(`Disconnected socket: ${socket.id}`);

            for (const [userId, socketId] of userSocketMap.entries()) {
                if (socketId === socket.id) {
                    userSocketMap.delete(userId);
                    console.log(`Removed ${userId} from userSocketMap`);
                    break;
                }
            }
        });
    });
};

export default setupSocket;
