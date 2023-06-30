import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: {timestamps: true}})

export class Product {
    public _id!: string
    
    @prop()
    public image!: object
    
    @prop({required: true})
    public brand!: string

    @prop({required: true})
    public size!: string

    @prop({required: true, default: 0})
    public price!: string

    @prop({required: true, default: 0})
    public countInStock!: number

}

export const ProductModel = getModelForClass(Product);