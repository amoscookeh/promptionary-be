import express from "express";
import multer from "multer";
import {
  register,
  login,
  getUserDetails,
  updateUserDetails,
  uploadProfilePhoto,
  fetchProfilePhotoUrl,
} from "../controllers/userController.js";

const router = express.Router();
const upload = multer();

// Auth
router.post("/register", register);
router.post("/login", login);

// User profile
router.get("/user/:userId", getUserDetails);
router.put("/user/:userId", updateUserDetails);
router.post("/upload-profile-photo", upload.single("file"), uploadProfilePhoto);
router.get("/profile-picture/:userId", fetchProfilePhotoUrl);

export default router;
