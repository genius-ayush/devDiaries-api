import mongoose from "mongoose"

export const userSchema = new mongoose.Schema({
    name : String , 
    email: String , 
    password: String , 
} , {timestamps:true})


export const postSchema = new mongoose.Schema({
    title:{type: String } , 
    imgUrl:{type:String} , 
    content:{type:String } , 
    summary:{type: String} , 
    author:{type: mongoose.Schema.Types.ObjectId , ref:'User' , required:true} , 
} , {timestamps:true})

export const User = mongoose.model('User' , userSchema) ; 
export const Post = mongoose.model('Post' , postSchema) ; 