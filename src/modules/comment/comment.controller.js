import { Comment } from "../../../database/models/comment.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"






const addComment = catchError(async(req , res , next) => {
    req.body.userId = req.user._id
    let comment = new Comment(req.body)
    await comment.save()
    res.json({message : "success" , comment})
})


const getComment = catchError(async(req , res , next) => {
    let comment = await Comment.findById(req.params.id)
    comment || next(new AppError("comment not found" , 404))
    !comment || res.json({message : "success" , comment})
})


const allComments = catchError(async(req , res , next) => {
    let comments = await Comment.find()
    comments || res.json({message : "success" , comments})
})


const updateComment = catchError(async(req , res , next) => {
    let comment = await Comment.findOneAndUpdate({_id : req.params.id  , userId : req.user._id}, req.body , {new : true})
    comment || next(new AppError("comment not found" , 404))
    !comment || res.json({message : "success" , comment})
})


const deleteComment = catchError(async(req , res , next) => {
    let post = await Comment.findOneAndDelete({_id : req.params.id  , userId : req.user._id})
    post || next(new AppError("post not found" , 404))
    !post || res.json({message : "success" , post})
})


export {
    addComment,
    getComment,
    allComments,
    updateComment,
    deleteComment
}