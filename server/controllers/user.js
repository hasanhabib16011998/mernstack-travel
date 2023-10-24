import User from '../model/User.js';
import tryCatch from './tryCatch.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register= tryCatch(async (req,res)=>{
    const {name,email,password}=req.body;
    console.log(name,email,password);

    if(password.length<6){
        return res.status(400).json({
            success:false,
            message:"Password must be 6 characters long"
        })
    }

    const emaillowercase=email.toLowerCase();
    const existedUser=await User.findOne({email:emaillowercase});
    console.log(existedUser);

    if(existedUser){
        return res.status(400).json({success:false,message:"User already exists!"})

    }

    const hashedpassword=await bcrypt.hash(password,12);

    const user=await User.create({
        name, email:emaillowercase,password:hashedpassword
    })

res.status(201).json({
    success:true,
    result:{ id:user._id,name:user.name,email:user.email}
})

})

export const login=tryCatch(async(req,res)=>{
    const { email, password }=req.body;
    const emaillowercase=email.toLowerCase(); //as it is case sensitive
    const existedUser= await User.findOne({email:emaillowercase});
    if(!existedUser){
        return res.status(404).json({success:false,message:'User does not exist!'})
    }
    const correctPassword= await bcrypt.compare(password,existedUser.password);
    if(!correctPassword){
        return res.status(404).json({success:false,message:'Invalid credential'})
    }
    const { _id:id, name,photoURL}=existedUser;
    const token=jwt.sign({id,name,photoURL},process.env.JWT_SECRET,{expiresIn:'1h'});
    res.status(200).json({
        success:true,
        result: {id,name,email:emaillowercase,photoURL,token}
    });


})

export const updateProfile=tryCatch(async(req,res)=>{
    const updatedUser=await User.findByIdAndUpdate(req.user.id,req.body,{new:true});
    const {_id:id,name,photoURL}=updatedUser;

    const token=jwt.sign({id,name,photoURL},process.env.JWT_SECRET,{expiresIn:'1h'});
    res.status(200).json({success:true,result:{name,photoURL,token}})
})