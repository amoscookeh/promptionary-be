import * as GameRoomModel from "../models/gameRoomModel.js";
import generateRandomName from "../utils/roomNameGenerator.js";

export async function createRoom(req, res) {
  try {
    let { hostUserId, roomName, difficulty } = req.body;
    let isUniqueName =
      roomName && !(await GameRoomModel.doesRoomNameExist(roomName));

    while (!isUniqueName) {
      console.log("Generating room name...");
      roomName = generateRandomName();
      isUniqueName = !(await GameRoomModel.doesRoomNameExist(roomName));
    }

    const newRoom = await GameRoomModel.createGameRoom({
      hostUserId,
      roomName,
      difficulty,
    });
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getRoom(req, res) {
  try {
    const { roomId } = req.params;
    const room = await GameRoomModel.getGameRoom(roomId);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateRoom(req, res) {
  try {
    const { roomId } = req.params;
    const updates = req.body;
    const updatedRoom = await GameRoomModel.updateGameRoom(roomId, updates);
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
