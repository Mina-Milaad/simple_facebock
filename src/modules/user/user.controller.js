import { User } from "../../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"




const addUser = catchError(async(req , res , next) => {
    let user = new User(req.body)
    await user.save()
    res.json({message : "success" , user})
})


const allUsers = catchError(async(req , res , next) => {
  let users = await User.find()
  res.json({message : "success" , users})
})


const getUser = catchError(async(req , res , next) => {

  let user = await User.findById(req.params.id)
  user || next(new AppError("user not found" , 404))
  !user || res.json({message : "success" , user})
})

export {
    addUser,
    allUsers,
    getUser
}