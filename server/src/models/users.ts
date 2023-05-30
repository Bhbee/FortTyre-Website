import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    phone_number:{
        type: Number,
        required: true
    },
    authentication:{
        email:{
            type: String,
            required: true,
            select: false
        },
        salt:{
            type: String,
            select: false
        },
        sessionToken:{
            type: String,
            select: false
        }
    } 
});

export const UserModel = mongoose.model('User', UserSchema);