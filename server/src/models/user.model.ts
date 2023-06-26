import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: {timestamps: true}})
export class User {
    public _id?: string
    @prop({required: true})
    public first_name!: string
    
    @prop({required: true})
    public last_name!: string
        
    @prop({required: true, unique: true})
    public email!: string

    @prop({required: true, unique: true})
    public phone_number!: string

    @prop({required: true})
    public password!: string

    @prop()
    public resetToken!: string
    
    @prop()
    public refreshToken!: string
 
    @prop({required: true, default: false})
    public isAdmin!: boolean

}
export const UserModel = getModelForClass(User)
