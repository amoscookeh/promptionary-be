import bcrypt from "bcryptjs";
import * as UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const { username, password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.insertUser({ username, hashedPassword, email });

    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await UserModel.loginUser(username);

    if (user && (await bcrypt.compare(password, user.password_hash))) {
      const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).send({ error: "Invalid password" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function getUserDetails(req, res) {
  try {
    const { userId } = req.params;
    const user = await UserModel.fetchUserDetails(userId);
    res.json(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function uploadProfilePhoto(req, res) {
  const file = req.file;
  const { user_id } = req.body;
  const currDT = new Date().getTime();

  if (!file || !user_id) {
    return res.status(400).send({ error: "File and user ID are required." });
  }

  try {
    const filePath = `public/${user_id}/${currDT}_${file.originalname}`;
    await UserModel.uploadProfilePicture(filePath, file.buffer);

    await UserModel.updateUser(user_id, { profilePictureUrl: filePath });

    res.json({ message: "File uploaded successfully", filePath });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function fetchProfilePhotoUrl(req, res) {
  try {
    const { userId } = req.params;

    const { profile_picture_url: filePath } = await UserModel.fetchUserDetails(
      userId
    );
    if (!filePath) {
      return res
        .status(404)
        .send({ error: "User does not have a profile photo" });
    }

    const publicURL = await UserModel.fetchProfilePictureUrl(filePath);

    res.json(publicURL);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export async function updateUserDetails(req, res) {
  try {
    const { userId } = req.params;
    const { username, email, profilePictureUrl } = req.body;
    const updatedUser = await UserModel.updateUser(userId, {
      username,
      email,
      profilePictureUrl,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
