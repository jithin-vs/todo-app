import express from 'express';
import { User } from '../Schema/mainSchema.js';
import { customAlphabet } from 'nanoid';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import { verifyToken, generateToken } from '../Auth/auth.js';
const router = express.Router();
const nanoid = customAlphabet('1234567890', 6);
configDotenv();

  router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log("Username:", username);
      console.log("Password:", password);
      const user = await User.findOne({ username });
      if (!user || password !== user.password) {
        return res.status(401).json({ error: "Incorrect username or password" });
      }
      const token = jwt.sign(
        {
          userData: user,
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({ message: "Login successful", token, userData: user });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
router.post("/register",async (req, res) => {
    try {
        const { name, email, username, password} = req.body;
        const newUser = new User({
            name,
            email,
            username,
            password
        });
        await newUser.save();
        res.status(201).json({ message: "User saved successfully" });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Username already exists" });
      } else {
        console.error("Error saving user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
);
router.get("/getTodo",verifyToken,async (req, res) => {
    try {
        const { name, email, username, password} = req.body;
        const newUser = new User({
            name,
            email,
            username,
            password
        });
        await newUser.save();
        res.status(201).json({ message: "User saved successfully" });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Username already exists" });
      } else {
        console.error("Error saving user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
);
export default router ;