import Joi from "joi";

export const addPostValidation = Joi.object({
    title: Joi.string()
        .min(2)
        .max(2000)
        .required()
        .messages({
            'string.min': 'Too short category name',
            'string.max': 'Too high title name'
        }),
    content: Joi.string().required(),
});


export const updatePostValidation = Joi.object({
    id: Joi.string().length(24).hex().required(),

    title: Joi.string()
        .min(2)
        .max(2000)
        .required()
        .messages({
            'string.min': 'Too short category name',
            'string.max': 'Too high title name'
        }),
    content: Joi.string().required(),
});