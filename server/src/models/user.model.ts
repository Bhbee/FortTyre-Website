import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose'


@modelOptions({ schemaOptions: {timestamps: true}})
export class User {
    
    public _id?: string
    
    @prop()
    public googleId?: string

    @prop({required: true})
    public first_name!: string
    
    @prop({required: true})
    public last_name!: string
        
    @prop({required: true, unique: true})
    public email!: string

    @prop({ unique: true})
    public phone_number!: string

    @prop()
    public password!: string

    @prop()
    public refreshToken!: string
 
    @prop({required: true, default: false})
    public isAdmin!: boolean

}
export const UserModel = getModelForClass(User)
