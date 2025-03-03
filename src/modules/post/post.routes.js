import { Router } from "express";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addPost, allPosts, deletePost, getPost, updatePost } from "./post.controller.js";
import { validate } from "../../middleware/validate.js";
import { addPostValidation, updatePostValidation } from "./post.validation.js";

const postRouter = Router()

postRouter.route('/')
        .post(protectedRoutes, allowoedTo('user'), validate(addPostValidation), addPost)
        .get(allPosts)

postRouter.route('/:id')
        .get(getPost)
        .put(protectedRoutes, allowoedTo('user'), validate(updatePostValidation), updatePost)
        .delete(protectedRoutes, allowoedTo('user'), deletePost)



export default postRouter