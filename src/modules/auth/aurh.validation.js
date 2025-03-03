import Joi from "joi";

export const signupValidation = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});



export const signinValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});
