import express from'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './route/userRouter.js';

dotenv.config();
const port=process.env.PORT||5000;
const app=express();
app.use(cors());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',process.env.CLIENT_URL);
    next();
})

app.use(express.json({limit:'10mb'}));
app.use('/user',userRouter);
// app.use('/room',roomRouter);
app.use('/',(req,res)=>{
    res.json({message:"Welcome to the travel world"})
})
app.use((req,res)=>{
    res.status(404).json({success:false,message:'Not found'})
})

const startserver = async () => {
    try {
      await mongoose.connect(process.env.MONGO_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected");
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.log(error);
    }
  };
  

startserver();