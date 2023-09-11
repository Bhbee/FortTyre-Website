import { modelOptions, prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Order } from './order.model'

@modelOptions({ schemaOptions: {timestamps: true}})
export class Payment {
    public _id?: string

    // @prop({ref: Order, required: true})
    // public order!: Ref<Order>
    
    @prop({required: true})
    public email!: string
        
    @prop({required: true})
    public amount!: number

    @prop({required: true})
    public reference!: string

    @prop({required: true})
    public status!: string

}
export const PaymentModel = getModelForClass(Payment)
