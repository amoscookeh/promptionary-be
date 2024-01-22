import express from "express";
import multer from "multer";
import * as UserController from "../controllers/userController.js";

const router = express.Router();
const upload = multer();

// Auth
router.post("/register", UserController.register);
router.post("/login", UserController.login);

// User profile
router.get("/user/:userId", UserController.getUserDetails);
router.put("/user/:userId", UserController.updateUserDetails);

// Profile photo
router.post(
  "/upload-profile-photo",
  upload.single("file"),
  UserController.uploadProfilePhoto
);
router.get("/profile-picture/:userId", UserController.fetchProfilePhotoUrl);

export default router;
