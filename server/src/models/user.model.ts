//import mongoose from "mongoose";
import { Schema, Document, model } from 'mongoose';
import bcrypt from "bcrypt";


export interface UserDocument extends Document{
    first_name: string;
    last_name: string;
    email: string;
    phone_number: number
    password: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>
}


const UserSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    phone_number:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        select: false,
        unique: true
    },
    password:{
        required: true,
        type: String
    },
    // refreshToken:{
    //     type: String
    // }
        
},
{timestamps: true}
);

//hashing of password
UserSchema.pre<UserDocument>("save", async function (next) {
    let user = this;
    
    //hash password if its new or has just been modified
    if (!user.isModified("password")) return next();

    //const salt = await bcrypt.genSalt(config.get("saltWorkFactor"))
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;
    return next();
})


//On Login
UserSchema.methods.comparePassword = async function (candidatePassword: string){
        const user = this as UserDocument;

        return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
    };

const User = model<UserDocument>('User', UserSchema);

export default User;