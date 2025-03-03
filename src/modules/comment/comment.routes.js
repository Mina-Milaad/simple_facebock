import { Router } from "express";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addComment, allComments, deleteComment, getComment, updateComment } from "./comment.controller.js";
import { validate } from "../../middleware/validate.js";
import { addCommentValidation, updateCommentValidation } from "./comment.validation.js";

const commentRouter = Router()

commentRouter.route('/')
        .post(protectedRoutes, allowoedTo('user'), validate(addCommentValidation), addComment)
        .get(allComments)

commentRouter.route('/:id')
        .get(getComment)
        .put(protectedRoutes, allowoedTo('user'), validate(updateCommentValidation), updateComment)
        .delete(protectedRoutes, allowoedTo('user'), deleteComment)



export default commentRouter