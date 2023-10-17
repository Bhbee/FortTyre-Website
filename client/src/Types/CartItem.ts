type ProductImage = {
    public_id: string
    url: string
}

export type OrderItems = {
    _id: string
    image: ProductImage
    name: string,
    quantity: number,
    price: number,
    countInStock: number 
}


// export type CartItems = {
//     _id: string
//     image: ProductImage
//     name: string,
//     quantity: number,
//     price: number,
//     countInStock: number 
// }[]


export type DeliveryAddress = {
    fullname: string,
    address: string,
    city: string,
    country: string,
}

export type Cart = {
    orderItems: OrderItems[]
    deliveryAddress: DeliveryAddress,
    itemsPrice: number, 
    deliveryPrice: number,
    totalPrice: number,
}