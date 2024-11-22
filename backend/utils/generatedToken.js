import jwt from 'jsonwebtoken';

const generateTokenAndSetCookies = (userId, res) => {
  try {
    // Generate the token
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: '15d', // Token expires in 15 days
    });

    // Set the token in cookies
    res.cookie('jwt', token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
      httpOnly: true, // Prevent client-side access to the cookie
      sameSite: "strict", // Prevent CSRF
      secure: process.env.NODE_ENV !== "development", // Secure only in production
    });

    return true;
  } catch (error) {
    console.error("Error generating token or setting cookie:", error);
    return false; // Handle errors
  }
};

export default generateTokenAndSetCookies;
