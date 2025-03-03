import { Router } from "express";
import { addUser, allUsers, getUser } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { validate } from "../../middleware/validate.js";
import { addUserValidation } from "./user.validation.js";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";


const userRouter = Router()

userRouter.route('/')
    .post(protectedRoutes, allowoedTo('admin'), validate(addUserValidation), checkEmail, addUser)
    .get(allUsers)
userRouter.route('/:id').get(getUser)

export default userRouter