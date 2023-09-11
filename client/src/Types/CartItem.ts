interface ProductImage {
    public_id: string
    url: string
}

export type OrderItems = {
    image: ProductImage
    _id: string
    name: string,
    quantity: number,
    price: number,
    countInStock: number
    
}

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