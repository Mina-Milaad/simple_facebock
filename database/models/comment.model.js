import mongoose, { Types } from "mongoose";


const schema = new mongoose.Schema({
    content : String,
    postId : {
        type : Types.ObjectId,
        ref : 'Post'
    },
    userId : {
        type : Types.ObjectId,
        ref : 'User'
    }

}, {timestamps : true , versionKey : false})


export const Comment = mongoose.model('Comment' , schema)