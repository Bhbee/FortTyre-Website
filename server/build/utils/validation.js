"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegisterData = exports.validateLoginData = void 0;
const joi_1 = __importDefault(require("joi"));
const validateLoginData = (login) => {
    const loginSchema = joi_1.default.object({
        email: joi_1.default.string().email().required().messages({ 'string.pattern.base': 'Email must be a valid email type' }),
        password: joi_1.default.string().min(8).max(36).pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'))
            .required()
            .messages({ 'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
        }),
        //The value must match a regular expression pattern that requires at least one uppercase letter, one lowercase letter, one digit, and one special character 
    });
    return loginSchema.validate(login);
};
exports.validateLoginData = validateLoginData;
const validateRegisterData = (user) => {
    const RegisterSchema = joi_1.default.object({
        first_name: joi_1.default.string().min(2).required(),
        last_name: joi_1.default.string().min(2).required(),
        email: joi_1.default.string().email().required().messages({ 'string.pattern.base': 'Email must be a valid email type' }),
        phone_number: joi_1.default.string().min(11).max(11)
            .required()
            .messages({ 'string.pattern.base': 'Phone number must 11 digits without the country code',
        }),
        password: joi_1.default.string().min(8).max(36)
            .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'))
            .required()
            .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
        }),
        isAdmin: joi_1.default.boolean()
    });
    return RegisterSchema.validate(user);
};
exports.validateRegisterData = validateRegisterData;
