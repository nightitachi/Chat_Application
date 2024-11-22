import React from "react";
import User from "../models/authmodel.js";
import bcrypt from "bcryptjs";

// Signup functionality
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, ConfirmedPassword, gender } =
      req.body;

    if (password.length < 6) {
      return res.status(400).json("Password must be more than 6 characters");
    }

    if (ConfirmedPassword !== password) {
      return res.status(400).json("Passwords do not match!");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json("User already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: "", // Provide a default or optional value
    });

    await newUser.save();
    res.status(201).json({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: "",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json("Internal server error");
  }
};

// Login functionality
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Wrong username!" });
    }

    // Compare the password with the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Wrong password!" });
    }

    // Send user data in response
    const { _id, fullName, profilePic } = user;
    res.status(200).json({
      _id,
      fullName,
      username,
      profilePic,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

// Logout functionality
export const logout = async (req, res) => {
  res.status(200).json("Logout works as well");
};
