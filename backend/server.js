import express from 'express'
import cors from 'cors'
import authrouter from './routes/authrouter.js'
const app = express()

app.use(cors())
app.post('/' , authrouter)
app.listen(3001 , ()=>{
  console.log("server work ! ");
  
})