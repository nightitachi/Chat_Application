import mongoose from 'mongoose'

const connectDB = async()=>{
  try {
    mongoose.connect('mongodb://localhost:27017')
    console.log("connected to mongoDB");
    
  } catch (error) {
    console.log("can't connect to mongoDB");
    
  }
}
export default connectDB;