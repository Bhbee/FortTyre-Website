import { modelOptions, prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Product} from './product.model'
import { User } from './user.model'
import { Payment } from './payment.model'

@modelOptions({ schemaOptions: {timestamps: true}})
class DeliveryAddress {
  @prop()
  public fullname?: string

  @prop()
  public address?: string

  @prop()
  public city?: string

  // @prop()
  // public postalCode?: string

  @prop()
  public country?: string
}

class Item {
  @prop ({required: true })
  public name!: string

  @prop ({required: true })
  public quantity!: number

  @prop ({required: true })
  public image!: string

  @prop ({required: true })
  public price!: number

  @prop({required: true, default: 0})
  public countInStock!: number

  @prop ({ref: Product})
  public product?: Ref<Product> 

}

@modelOptions( {schemaOptions: {timestamps: true}})
export class Order {
  public _id!: string
  
  @prop()
  public orderItems!: Item[]

  @prop()
  public deliveryAddress ?: DeliveryAddress 

  @prop({ref: User, required: true})
  public user!: Ref<User>

  @prop({ref: Payment})
  public paymentInfo?: Ref<Payment>

  @prop({required: true, default: 0})
  public itemPrice!: number

  @prop({required: true, default: 0})
  public deliveryPrice!: number

  @prop({required: true, default: 0})
  public totalPrice!: number

  @prop({required: true, default: false})
  public isPaid!: boolean

  @prop()
  public paidAt!: Date

  @prop({required: true, default: false})
  public isDelivered!: boolean

  @prop()
  public deliveredAt!: Date
}

export const OrderModel = getModelForClass(Order)