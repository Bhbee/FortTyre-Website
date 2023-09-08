import Joi from 'joi'
import { User } from '../models/user.model';

export const validateLoginData = (login: { email: string; password: string }) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({ 'string.pattern.base': 'Email must be a valid email type' }),
    password: Joi.string()
      .min(8)
      .max(24)
      .pattern(new RegExp('^(?=.*[@$!%*#_+-~<>?&]).{8,}$'))
      .required()
      //.messages({ 'string.pattern.base': 'Password must contain at least one special character' }),
  });
  return loginSchema.validate(login);
};

export const validateRegisterData = (user: User) =>{
    const RegisterSchema = Joi.object<User>({
        first_name: Joi.string().min(2).required(),
        last_name: Joi.string().min(2).required(),
        email: Joi.string().email().required().messages({'string.pattern.base': 'Email must be a valid email type'}),
        phone_number: Joi.string().min(11).max(11)
            .required()
            .messages({'string.pattern.base': 'Phone number must 11 digits without the country code',
        }),
        password: Joi.string()
            .min(8).max(24)
            .pattern(new RegExp('^(?=.*[@$!%*?&]).{8,}$'))
            .required()
            .messages({'string.pattern.base': 'Password must contain at least one special character',
        }),
        isAdmin: Joi.boolean()
    })

    return RegisterSchema.validate(user)
}