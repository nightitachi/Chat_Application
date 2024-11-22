import express from 'express';
import cors from 'cors';
import authrouter from './routes/authrouter.js';
import connectToMDB from './config/connectToMDB.js';

const app = express();

app.use(cors());
app.use(express.json()); 

// Routes
app.use('/auth', authrouter);

// Connect to MongoDB
connectToMDB();

// Start the server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
