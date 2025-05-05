const express = require('express')
const Router = require('./Routes/todoRoute')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Connection error:', err))

app.use(cors({
    origin: "https://todos-list-pearl.vercel.app",
    credentials: true 
  }));
app.use(express.json())
app.use('/',Router)



app.listen(process.env.PORT,()=>{
    console.log('server runnging');
    
})