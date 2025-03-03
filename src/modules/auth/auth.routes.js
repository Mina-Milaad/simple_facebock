import { Router } from "express"
import { signin, signup } from "./auth.controller.js"
import { checkEmail } from "../../middleware/checkEmail.js"
import { validate } from "../../middleware/validate.js"
import { signinValidation, signupValidation } from "./aurh.validation.js"

const authRouter = Router()


authRouter.post('/signup', validate(signupValidation), checkEmail, signup)
authRouter.post('/signin', validate(signinValidation), signin)


export default authRouter