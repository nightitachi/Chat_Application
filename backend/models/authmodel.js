import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true, 
    },
    gender: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: false,  // Make it optional
      default: '' // Optional: Provide a default empty string or a default image URL
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
