import express from "express";
import * as GameRoomController from "../controllers/gameRoomController.js";

const router = express.Router();

// Basic CRUD
router.post("/", GameRoomController.createRoom);
router.get("/:roomId", GameRoomController.getRoom);
router.put("/:roomId", GameRoomController.updateRoom);

export default router;
