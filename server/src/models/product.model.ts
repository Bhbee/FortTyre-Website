import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose'
interface ProductImage {
    public_id: string
    url: string
}

@modelOptions({ schemaOptions: {timestamps: true}})

 
export class Product {
    public _id!: string
    
    @prop({required: true})
    public image!: ProductImage
    
    @prop({required: true})
    public brand!: string

    @prop({required: true})
    public size!: string

    @prop({required: true, default: 0})
    public price!: number

    @prop({required: true, default: 0})
    public countInStock!: number

}

export const ProductModel = getModelForClass(Product);