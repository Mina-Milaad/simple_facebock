import mongoose, { Types } from "mongoose";


const schema = new mongoose.Schema({
    title : {
        type : String,
        maxLenght : [2000 , 'too hight title name'],
        minLenght : [2 , 'too chort category name']
    },
    content : String,
    author : {
        type : Types.ObjectId,
        ref : 'User'
    }
}, {timestamps : true , versionKey : false})


export const Post = mongoose.model('Post' , schema)