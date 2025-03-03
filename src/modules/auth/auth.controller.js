import jwt from "jsonwebtoken"
import { User } from "../../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"

import bcrypt from 'bcrypt'
import { AppError } from "../../utils/appError.js"


const signup = catchError(async (req, res) => {

    let user = new User(req.body)
    await user.save()
    let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY)
    res.json({ message: "success", token, user })

})


const signin = catchError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY)
        return res.json({ message: "success", token })
    }
    next(new AppError('incorrect email or password', 401))
})





const protectedRoutes = catchError(async (req, res, next) => {
    let { token } = req.headers
    let userPayload = null;
    if (!token) return next(new AppError("token not provided", 401))

    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if (err) return next(new AppError(err, 401))
        userPayload = payload
    })

    let user = await User.findById(userPayload.userId)
    if (!user) return next(new AppError('user not found', 401))
    if (user.passwordChangedAt) {
        let time = parseInt(user.passwordChangedAt.getTime()) / 1000
        if (time > userPayload.iat) next(new AppError('invalid token .... login again', 401))
    }

    req.user = user
    next()
})



const allowoedTo = (...roles) => {
    return catchError(async (req, res, next) => {
        if (roles.includes(req.user.role)) {
            return next()
        }
        return next(new AppError("you not authorized to access this endpoint", 401))

    })
}


export {
    signup,
    signin,
    protectedRoutes,
    allowoedTo
}