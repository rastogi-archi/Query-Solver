import express from "express";
import Message from "../models/Message.models.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;
    const message = await Message.create({ senderId, receiverId, text });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: "Error saving message" });
  }
});

router.get("/:userId/:otherUserId", async (req, res) => {
  const { userId, otherUserId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

export default router;
