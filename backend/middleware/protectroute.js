import jwt from 'jsonwebtoken';
import User from '../models/authmodel.js';

const protectroute = async (req, res, next) => {
  try {
    // Ensure the cookie-parser middleware is used in your app
    const token = req.cookies?.jwt; // Fixed to req.cookies

    if (!token) {
      return res.status(401).json({ error: "Unauthorized, Token not provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Fixed key spelling

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized, Invalid Token" });
    }

    // Fetch user from database
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "Unauthorized, User not found" });
    }

    req.user = user; // Attach user info to request object
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized, Invalid Token", details: error.message });
  }
};

export default protectroute;
