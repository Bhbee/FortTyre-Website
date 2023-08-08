export type OrderItems = {
    name: string,
    quantity: number,
    price: string
}

export type DeliveryAddress = {
    fullname: string,
        address: string,
        city: string,
        postalcode: string,
        country: string
}

export type Cart = {
    orderItems: {
    name: string,
    quantity: number,
    price: string
}[]
    deliveryAddress: DeliveryAddress,
    itemPrice: number, 
    deliveryPrice: number,
    totalPrice: number 
}