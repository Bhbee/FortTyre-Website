import {index,  modelOptions, pre, prop, getModelForClass } from '@typegoose/typegoose'

import bcrypt from 'bcryptjs';

@index({ email: 1 })
@pre<User>('save', async function () {
  // Hash password if the password is new or was updated
  if (!this.isModified('password')) return;

  // Hash password with costFactor of 12
  this.password = await bcrypt.hash(this.password, 12);
})

@modelOptions({ schemaOptions: {timestamps: true}})
export class User {

    public _id?: string
    
    @prop()
    public name?: string

    @prop({required: true})
    public first_name!: string
    
    @prop({required: true})
    public last_name!: string
        
    @prop({required: true, unique: true})
    public email!: string

    @prop({required: true, unique: true})
    public phone_number!: string

    @prop({required: true, minlength: 8, maxLength: 32, select: false})
    public password!: string

    @prop({ default: 'default.png' })
    public photo?: string

    @prop()
    public refreshToken!: string
 
    @prop({required: true, default: false})
    public isAdmin!: boolean

}
export const UserModel = getModelForClass(User)
