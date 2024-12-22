import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {User } from '../db';
import {authenticateJwt , SECRET}from '../middleware'; 

const router = Router() ; 


router.post('/register' , async (req : Request , res: Response)=>{

    const {name , email , password} = req.body ; 
    const user = await User.findOne({email}) ; 
    if(user){
        res.status(403).json({message:'User already exist'}) ; 
    }else{
        const newUser = new User({ name , email , password });
        await newUser.save() ; 
        const token = jwt.sign({ id: newUser._id} , SECRET , { expiresIn: '1h' })
        res.json({message: 'User created successfully' , token , userId : newUser._id})
    }

})

router.post('/login' , async(req , res)=>{

    const {email , password} = req.body ; 
    const user = await User.findOne({email , password}) ;

    if(user){
        const token = jwt.sign({id: user._id} , SECRET , {expiresIn: '1h'});
        res.json({message: 'Logged in Successfully' , token , userId : user._id}); 
    }else{
        res.status(403).json({message: 'Invalid email or password'}) ; 
    }
})

router.get('/me' , authenticateJwt , async(req , res)=>{
    const userId = req.headers["userId"];
    const user = await User.findOne({ _id: userId}); 
    try{

        if(user){
            res.json({username : user.name , email : user.email , userId})
        }else{
            res.status(403).json({message : 'user not logged in'}) ; 
        }

    }catch(err){
        console.log(err); 
    }

    
})

export default router ; 