import { Post } from "../../../database/models/post.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";




const addPost = catchError(async(req , res , next) => {
    let post = new Post({
        ...req.body,
        author : req.user._id
    })

    await post.save()
    res.json({message : "success" , post})

})


const getPost = catchError(async(req , res , next) => {
    let post = await Post.findById(req.params.id)
    post || next(new AppError("post not found" , 404))
    !post || res.json({message : "success" , post})
})


const allPosts = catchError(async(req , res , next) => {
    let posts = await Post.find()
    posts || next(new AppError("posts not found" , 404))
    !posts || res.json({message : "success" , posts})
})


const updatePost = catchError(async(req , res , next) => {
    let post = await Post.findOneAndUpdate({_id : req.params.id  , author : req.user._id}, req.body , {new : true})
    post || next(new AppError("post not found" , 404))
    !post || res.json({message : "success" , post})
})


const deletePost = catchError(async(req , res , next) => {
    let post = await Post.findOneAndDelete({_id : req.params.id  , author : req.user._id})
    post || next(new AppError("post not found" , 404))
    !post || res.json({message : "success" , post})
})


export { 
    addPost,
    getPost,
    allPosts,
    updatePost,
    deletePost

}