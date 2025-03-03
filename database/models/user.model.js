import mongoose from "mongoose";
import bcrybt from 'bcrypt'

const schema = new mongoose.Schema({
    username : String,
    email : {
        type : String,
        unique : [true , 'email is required'],
        required : true,
    },
    password : String,
    role : {
        type : String,
        enum : ['admin' , 'user'],
        default : 'user'
    },
}, {timestamps : true , versionKey : false})


schema.pre('save' , function() {
    this.password = bcrybt.hashSync(this.password , 8)
})

schema.pre('findOneAndUpdate' , function() {
    if(this._update.password ) this._update.password = bcrybt.hashSync(this._update.password , 8)
})


export const User = mongoose.model('User' , schema)