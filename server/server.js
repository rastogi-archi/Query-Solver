import express from "express";
import databaseConnect from "./dbConnection/db.js";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import AuthRoute from "./routes/Auth.routes.js"
import PostRoute from "./routes/Post.routes.js"
import UserRoute from "./routes/User.routes.js"
import setupSocket from "./socket.js";
import MessageRoute from "./routes/Message.routes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", AuthRoute);
app.use("/api/post", PostRoute);
app.use("/api/user", UserRoute);
app.use("/api/messages", MessageRoute);

const server = http.createServer(app);

setupSocket(server);

server.listen(PORT, () => {
    databaseConnect();
    console.log(`Server running at http://localhost:${PORT}`);
});