"use strict";
// import Joi from 'joi'
// import { User } from '../models/user.model';
// export const validateLoginData = (login: {email: string; password: string}) =>{
//     const loginSchema = Joi.object({
//         email: Joi.string().email().required().messages({'string.pattern.base': 'Email must be a vlid email type'}),
//         password: Joi.string().min(8).max(36).pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'))
//             .required()
//             .messages({'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
//         }),
//     })
//     return loginSchema.validate(login)
// }
// export const validateRegisterData = (user: User) =>{
//     const RegisterSchema = Joi.object({
//         first_name: Joi.string().min(2).required(),
//         last_name: Joi.string().min(2).required(),
//         email: Joi.string().email().required(),
//         phone_number: Joi.string().min(2).pattern(/^\+[1-9]\d{1,14}$/)
//             .required()
//             .messages({'string.pattern.base': 'Phone number must be in the format "+[country code][phone number]"',
//         }),
//         password: Joi.string().min(8).max(36)
//             .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'))
//             .required()
//             .messages({
//           'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
//         }),
//         isAdmin: Joi.boolean()
//     })
//     return RegisterSchema.validate(user)
// }
