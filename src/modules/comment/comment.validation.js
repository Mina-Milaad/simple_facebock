import Joi from "joi";

export const addCommentValidation = Joi.object({
    content: Joi.string().required(),
});


export const updateCommentValidation = Joi.object({
    id: Joi.string().length(24).hex().required(),
    content: Joi.string().required(),
});